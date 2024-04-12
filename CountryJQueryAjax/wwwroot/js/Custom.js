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
                object += '<td>
                    < a onclick = "DelteId()" asp - controller="Country" asp - action="Delete" class="btn btn-danger" >
                        <i class="bi bi-trash3"></i> Delete
                    </a >
                </td > ';
                object += '<td>
                    <a asp - controller="Country" asp - action="Edit" class="btn btn-primary" >
                        <i class="bi bi-pencil-square"></i> Edit
                    </a>
                </td > ';
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