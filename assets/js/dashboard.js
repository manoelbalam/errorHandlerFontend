$(document).ready(function () {
  $('.dropdown-menu a').on('click', function(){    
    $('.dropdown-toggle').html($(this).html());    
})

$('.dropdown-menu-country a').on('click', function(){    
  $('.dropdown-toggle').html($(this).html());    
})
  $("#wrapper").toggleClass("toggle");
  if (sessionStorage.getItem("jtwToken") === null) { window.location.replace("http://localhost:5000"); }
  $("#example").DataTable();

  var backendUrl = "http://localhost:8000/api/"

  loadData();
  $("#loadData").click(function () {
    loadData();
    loadData();
  });

  function loadData() {
    var jtwToken = sessionStorage.getItem("jtwToken");
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        'Authorization': 'Bearer ' + jtwToken
      }
    });
    $.ajax({
      type: 'GET',
      url: backendUrl + 'error_log',
      contentType: "application/json",
      dataType: 'json',
      success: function (data) {
        populateDataTable(data);
      },
      error: function (e) {
        console.log("There was an error with your request...");
        console.log("error: " + JSON.stringify(e));
      }
    });
  }

  // populate the errorLogTable with JSON data
  function populateDataTable(data) {

    document.getElementById("userName").textContent=sessionStorage.getItem('name');
    $("#errorLogTable").DataTable().clear();
    $.each(data, function(k,v) {
      $('#errorLogTable').dataTable().fnAddData([
        v.lead_id,
        v.error,
        v.country,
        v.created_at
      ]);
    });
    
  }
});