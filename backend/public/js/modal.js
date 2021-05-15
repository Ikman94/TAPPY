$(document).ready(function () {
    $(".updateOrder").click(function () {
        let id = $(this).attr("updateOrder")
        axios.get('/orders/' + id, {
        })
            .then((response) => {
                $('.statusField').val(response.data.status);
                $('.customerField').val(response.data.customer);
                $('.purchaseField').val(response.data.purchased);
                $('.totalField').val(response.data.total);
            }, (error) => {
                alert(error)
                console.log(error);
            });

        // let status = $('.statusField')

        $(".putOrder").click(function () {
            // let id = $(this).attr("order-id")
            // alert(id)
            let status = $('.statusField').val()
            let customer = $('.customerField').val()
            let purchase = $('.purchaseField').val()
            let total = $('.totalField').val()

            let data = {
                status: status,
                customer: customer,
                purchased: purchase,
                total: total
            }
            console.log(data)
            axios.put('http://localhost:7000/orders/' + id + '/update', {
                
            })
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
        })
      
    });

   

   
});