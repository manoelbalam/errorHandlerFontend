var backendUrl = "http://localhost:8000/api/";
$(document).ready(function () {
  // Validate Session
  if (sessionStorage.getItem("jtwToken") === null) { window.location.replace("http://localhost"); }
  //Init Left panel
  $("#wrapper").toggleClass("toggle");
  loadData();

  $("#sendError").click(function () {
    var data = { lead_id: $('#leadId').val(), country_id: $('#countryId').val(), error_id: $('#errorId').val() };
    $.ajax
      ({
        type: 'POST',
        url: backendUrl + 'error_log',
        dataType: 'JSON',
        data: data,
        success: function () {
          var table = $("#errorLogTable").DataTable();
          table.ajax.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
          
          alert(errorThrown);

        }
      });
  });
});

function loadData() {
  document.getElementById("userName").textContent = sessionStorage.getItem('name');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      'Authorization': 'Bearer ' + sessionStorage.getItem("jtwToken"),
    }
  });

  $('#errorLogTable').DataTable({
    order: [[3, "desc"]],
    searching: false,
    lengthChange: false,
    iDisplayLength: 15,
    ajax: backendUrl + 'error_log',
    dom: 'Plfrtip',
    columns: [
      { data: "lead_id" },
      { data: "country" },
      { data: "error" },
      { data: "created_at" }
    ],
    columnDefs: [{
      searchPanes: {
        show: true
      },
      targets: [0, 1, 2, 3]
    }]
  });
}