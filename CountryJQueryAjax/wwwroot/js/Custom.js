$(document).ready(function () {
    ShowAllData();
})

function ShowAllData() {
    $.ajax({
        url: 'Country/CountryList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (result,statu,xhr) {
            var object = "";
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.country + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.capitalCity + '</td>';
                object += '<td>' + item.population + '</td>';
                object += '<td><a onclick="DelteId()" class="btn btn-danger">Delete</a></td>';
                object += '<td><a onclick="EditId()" class="btn btn-primary">Edit</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data Can Not Get");
        }
    });
};

function DelteId(id) {
    $.ajax({
        url: `Country/Delete/${id}`,
        type: "Delete"
    })
}