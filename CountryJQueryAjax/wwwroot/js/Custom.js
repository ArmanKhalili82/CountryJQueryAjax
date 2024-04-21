$(document).ready(function () {
    ShowAllData();
})

//Get Data
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
                object += '<td><a onclick="DelteId(' + item.id + ')" class="btn btn-danger">Delete</a></td>';
                object += '<td><a onclick="EditId(' + item.id + ')" class="btn btn-primary">Edit</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data Can Not Get");
        }
    });
};


$(document).ready(function () {
    $('#btnAdd').Click(function () {
        alert("clicked");
        $('#CountryModal').modal('show');
        $('#modalTitle').text('Add Country');
    });
});


//Add Data
function Create() {
    var result = Validate();
    if (result == false) {
        return false;
    }


    var formData = new Object();
    formData.id = $('#Id').val();
    formData.Country = $('#Country').val();
    formData.City = $('#City').val();
    formData.Population = $('#Population').val();
    formData.CapitalCity = $('#CapitalCity').val();

    $.ajax({
        url: '/Country/Create',
        data: formData,
        type: 'Post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save the data');
            }
            else {
                HideModal();
                ShowAllData();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data');
        }

    });
}

function HideModal() {
    $(document).ready(function () {
        ClearData();
        $('#btnAdd').Click(function () {
            $('#CountryModal').modal('hide');
        });
    });
}

function ClearData() {
    $('#Country').val('');
    $('#City').val('');
    $('#Population').val('');

    $('#Country').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#Population').css('border-color', 'lightgrey');
}

function Validate() {
    var isValid = true;

    if ($('#Country').val().trim() == "") {
        $('#Country').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#Country').css('border-color', 'lightgrey');
    }

    if ($('#City').val().trim() == "") {
        $('#City').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }

    if ($('#Population').val().trim() == "") {
        $('#Population').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#Population').css('border-color', 'lightgrey');
    }
    return isValid;
}

$('#Country').change(function () {
    Validate();
})

$('#City').change(function () {
    Validate();
})

$('#Population').change(function () {
    Validate();
})

//Edit
function Edit(id) {
    $.ajax({
        url: '/Country/Edit?id=' + id,
        type: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable read to data');
            }
            else if (response.length == 0) {
                alert('Data not available with the id' + id);
            }
            else {
                $('#CountryModal').modal('show');
                $('modalTitle').text("Update Country");
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#Id').val(response.id);
                $('#Id').val(response.country);
                $('#Id').val(response.city);
                $('#Id').val(response.population);
                $('#Id').val(response.capitalCity);
            }
        },
        error: function () {
            alert('Unable read to data');
        }
    });
}

//Update Data
function Update() {
    var result = Validate();
    if (result == false) {
        return false;
    }
    var formData = new object();
    formData.id = $('#Id').val();
    formData.Country = $('#Country').val();
    formData.City = $('#City').val();
    formData.Population = $('#Population').val();
    formData.CapitalCity = $('#CapitalCity').val();

    $.ajax({
        url: '/Country/Update',
        data: formData,
        type: 'Post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save the data');
            }
            else {
                HideModal();
                ShowAllData();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data');
        }
    }

//Delete Data
    function Delete(id) {
        if (confirm("Are you sure to delete this record?")) {
            $.ajax({
                url: '/Country/Delete?id=' + id,
                type: 'post',
                success: function (response) {
                    if (response == null || response == undefined) {
                        alert('Unable to delete to data');
                    }

                    else {
                        ShowAllData();
                        alert(response);
                    }
                },
                error: function () {
                    alert('Unable to delete to data');
                }
            });
        }
            
        }


//function DelteId(id) {
//    $.ajax({
//        url: `Country/Delete/${id}`,
//        type: "Delete"
//    })
//}

//function EditId() {
//    window.location.href = "/country/create";
//    $.ajax({
//        url: 'Country/Edit',
//        type: "Get"
//    })

//}