import { BrowserRouter, Route, Link } from 'react-router-dom';
import Donuts from "./Pages/Donuts";
import ProductPage from "./Pages/productPage";
import CartPage from './Pages/cartPage';
import { useDispatch, useSelector } from 'react-redux';
import SigninPage from './Pages/signinPage';
import { signout } from './actions/userActions';
import ShippingAddressPage from './Pages/ShippingAddressPage';
import PaymentPage from './Pages/paymentPage';
import PlaceOrderPage from './Pages/placeOrderPage';
import OrderPage from './Pages/OrderPage';
import OrderHistoryPage from './Pages/orderHistoryPage';
import ProfilePage from './Pages/profilePage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Dashboard from './Pages/Dashboard';
import ProductListPage from './Pages/productListPage';
import ProductEditPage from './Pages/productEditPage';
import OrderListPage from './Pages/orderListPage';
import UserListPage from './Pages/userListPage';
import Home from './Pages/Home';
import RegisterScreen from './Pages/registerPage';
import SupportPage from './Pages/SupportPage';
import ChatBox from './Pages/ChatBox';
// import AdminHeader from './components/AdminSide';
import Cookies from './Pages/Cookies';
import IceCream from './Pages/IcreCream';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>

      <div className="grid-container">

        <main>
          <Route exact path="/" component={Home}></Route>
          <AdminRoute exact path="/register" component={RegisterScreen}></AdminRoute>
          <Route exact path="/signin" component={SigninPage}></Route>
          <Route exact path="/donuts" component={Donuts}></Route>
          <Route exact path="/cookies" component={Cookies}></Route>
          <Route exact path="/icecream" component={IceCream}></Route>
          <Route exact path="/product/:id" component={ProductPage}></Route>
          <Route exact path="/product/:id/edit" component={ProductEditPage}></Route>
          <Route exact path="/cart/:id?" component={CartPage}></Route>
          <Route exact path="/shipping" component={ShippingAddressPage}></Route>
          <Route exact path="/payment" component={PaymentPage}></Route>
          <Route exact path="/placeorder" component={PlaceOrderPage}></Route>
          <Route exact path="/order/:id" component={OrderPage}></Route>
          <Route exact path="/orderhistory" component={OrderHistoryPage}></Route>
          <PrivateRoute exact path="/profile" component={ProfilePage}></PrivateRoute>
          <AdminRoute exact path="/dashboard" component={Dashboard}></AdminRoute>
          <AdminRoute exact path="/productlist" component={ProductListPage}></AdminRoute>
          <AdminRoute exact path="/orderlist" component={OrderListPage}></AdminRoute>
          <AdminRoute exact path="/userlist" component={UserListPage}></AdminRoute>
          <AdminRoute exact path="/support" component={SupportPage}></AdminRoute>
          {/* <AdminRoute exact path="/adminheader" component={AdminHeader}></AdminRoute> */}

        </main>

        <footer className="footer ow center">
          <div className="container pt-5 border-bottom">
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
              <p className="text-center">© Tap |Privacy Policy|</p>
            
          </div>

        </footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
