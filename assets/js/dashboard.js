$(document).ready(function () {
  if (sessionStorage.getItem("jtwToken") === null) { window.location.replace("http://localhost:5000"); }
  // $("#example").DataTable();

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
        // console.log(data);
        // myJsonData = data;
        populateDataTable(data);
      },
      error: function (e) {
        console.log("There was an error with your request...");
        console.log("error: " + JSON.stringify(e));
      }
    });
  }

  // populate the data table with JSON data
  function populateDataTable(data) {
    // console.log("populating data table...");
    // clear the table before populating it with more data
    // console.log(data);
    // $("#example").DataTable().clear();
    $.each(data, function(k,v) {
      console.log(v);

      // $('#example').dataTable().fnAddData([
      //   v.lead_id,
      //   v.error,
      //   v.country,
      //   v.created_at
      // ]);
      /// do stuff
    });

    // var length = Object.keys(data).length;
    // console.log(data);
    // for (var i = 0; i < length + 1; i++) {
      // var error = ;
      // console.log('error');

      // You could also use an ajax property on the data table initialization
    // }
  }
});