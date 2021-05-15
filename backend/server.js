const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 5000;
const URL = "mongodb://localhost/TAP";
const Routes = require('./api/index.js');
const { Socket } = require('dgram');
const { exists } = require('./api/models/userModel.js');
// const AdminRoutes = require('./api/index2.js');

dotenv.config();

const app = express();

app.engine('hbs', handlebars({
    extname: "hbs",
    layoutsDir: "views",
    defaultLayout: "layouts/main",
    // partialsPath: 'views/modal'
}))

app.set('view engine', 'hbs')
app.set("views", "views")
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL || URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;

db.once('open', () => { console.log('Connected to MongoDB') });
db.on('error', err => { console.log(err) });
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/', Routes);
const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
});

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = []

io.on('connection', (socket) => {
    console.log('connection', socket.id);
    socket.on('disconnect', () => {
        const user = users.find((x) => x.socketId === socket.id);
        if (user) {
            user.online = false;
            console.log('Offline', user.name);
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                io.to(admin.socketId).emit('updateUser', user);
            }
        }
    });
    socket.on('onLogin', (user) => {
        const updatedUser = {
            ...user,
            online: true,
            socketId: socket.id,
            messages: [],
        };
        const existUser = users.find((x) => x._id === updatedUser._id);
        if (existUser) {
            existUser.socketId = socket.id;
            existUser.online = true;
        } else {
            users.push(updatedUser);
        }
        console.log('Online', user.name);
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
            io.to(admin.socketId).emit('updateUser', updatedUser);
        }
        if (updatedUser.isAdmin) {
            io.to(updatedUser.socketId).emit('listUsers', users);
        }
    });

    socket.on('onUserSelected', (user) => {
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
            const existUser = users.find((x) => x._id === user._id);
            io.to(admin.socketId).emit('selectUser', existUser);
        }
    });

    socket.on('onMessage', (message) => {
        if (message.isAdmin) {
            const user = users.find((x) => x._id === message._id && x.online);
            if (user) {
                io.to(user.socketId).emit('message', message);
                user.messages.push(message);
            }
        } else {
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                io.to(admin.socketId).emit('message', message);
                const user = users.find((x) => x._id === message._id && x.online);
                user.messages.push(message);
            } else {
                io.to(socket.id).emit('message', {
                    name: 'Admin',
                    body: 'Sorry. I am not online right now',
                });
            }
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// });