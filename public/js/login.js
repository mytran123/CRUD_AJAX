$(document).ready(function () {
    let baseUrl = origin;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('body').on('click','#login',function () {
        // alert(1)
        let email = $('.login-email').val();
        let password = $('.login-password').val();

        $.ajax({
            url: baseUrl + '/api/login',
            method: "POST",
            dataType: "json",
            data: {
                email: email,
                password: password,
            },
            success: function (res) {
                // console.log(res)
                window.location = baseUrl + '/api/book-list'
            }
        });
    })

});
