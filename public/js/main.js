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
});
