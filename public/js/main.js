$(document).ready(function () {
    let baseUrl = origin;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Hiển thị trang book list
    $.ajax({
        url: baseUrl + '/api/books',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            displayAllBook(res)
        }
    });

    function displayAllBook(books) {
        let str = "";
        for (let i = 0; i < books.length; i++) {
            str += `<tr id="book-${books[i].id}">
                            <td>${books[i].id}</td>
                            <td>${books[i].title}</td>
                            <td>${books[i].code}</td>
                            <td>${books[i].author}</td>
                            <td><button class="btn btn-warning edit-book" data-id="${books[i].id}">Update</button></td>
                            <td><button class="btn btn-danger delete-book" data-id="${books[i].id}">Delete</button></td>
                    </tr>`;
        }

        $('.book-list').html(str);
    }

    //Xóa book list
    $(document).on('click','.delete-book',function(){
        // console.log("ab")
        let idBook = $('.delete-book').attr('data-id');
        if (confirm('Có muốn xóa sách này không?')) {
            $.ajax({
                url:baseUrl + '/api/books/' +idBook+ '/delete',
                method: "GET",
                type: 'json',
                success: function (res) {
                    $('#book-' + idBook).remove();
                }
            })
        }
    })

    //Click vào nút Create Book sẽ hiện bảng modal
    $('body').on('click','#add-book',function(){
        $('.modal-add').show();
        $('.form-add').trigger('reset'); //add xong sau đó sẽ rest dữ liệu và ẩn đi
    });

    //Click vào nút Close sẽ ẩn bảng modal
    $('body').on('click','#close',function(){
        $('.modal').hide();
    });

    //Click vào nút Update sẽ hiện lên


    //Tạo Create book
    $('body').on('click','.add-book',function(){
        let title = $('#book-title').val();
        let code = $('#book-code').val();
        let author = $('#book-author').val();
        $('.add-book').attr('disabled', true);

        $.ajax({
            url:baseUrl + '/api/books/',
            method: "POST",
            type: 'json',
            data:{
                title: title,
                code: code,
                author: author
            },
            success: function (res) {
                console.log(res.data);
                $('.add-book').attr('disabled', false);
                // $('.form-add').trigger('reset'); //add xong sau đó sẽ rest dữ liệu và ẩn đi
                $('.modal').hide();
                addBook(res.data);
            }
        });
    });

    function addBook(book) {
        str = `<tr id="book-${book.id}">
                            <td>${book.id}</td>
                            <td>${book.title}</td>
                            <td>${book.code}</td>
                            <td>${book.author}</td>
                            <td><button class="btn btn-warning edit-book" data-id="${book.id}">Update</button></td>
                            <td><button class="btn btn-danger delete-book" data-id="${book.id}">Delete</button></td>
                    </tr>`;
        $('.book-list').prepend(str); //add lên đầu trang
    }


    //Edit book
    $('body').on('click','.edit-book',function(){
       $(".modal-update").show();
        // let idUser = $('.delete-user').attr('data-id');
        let idBook = $('.edit-book').attr('data-id')

        $.ajax({
            url:baseUrl + '/api/books/' + idBook,
            method: "GET",
            type: 'json',
            success: function (res) {
                console.log(res.data);
                $('.book-id').val(res.data.id);
                $('.book-title').val(res.data.title);
                $('.book-code').val(res.data.code);
                $('.book-author').val(res.data.author);
            }
        });
    });

    //Update
    $('body').on('click','.update-book',function(){
        let idBook = $('.book-id').val();

        $.ajax({
            url:baseUrl + '/api/books/' + idBook,
            method: "POST",
            dataType: 'json',
            data: {
                id: idBook,
                title: $('.book-title').val(),
                code: $('.book-code').val(),
                author: $('.book-author').val(),
            },
            success: function (res) {
                console.log(res);
                $('.modal').hide();
                $(`#book-${idBook} td:nth-child(1)`).html(res.data.id);
                $(`#book-${idBook} td:nth-child(2)`).html(res.data.title);
                $(`#book-${idBook} td:nth-child(3)`).html(res.data.code);
                $(`#book-${idBook} td:nth-child(4)`).html(res.data.author);
            }
        });
    });

    //logout
    $('body').on('click','.logout',function () {
        // alert(2)
        $.ajax({
            url: baseUrl + '/api/logout', //goi den duong dan api
            method: "GET",
            dataType: "json",
            success: function (res) { //chuyen trang
                window.location = baseUrl
            }
        })
    });
});
