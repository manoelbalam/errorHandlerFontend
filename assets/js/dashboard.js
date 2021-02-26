var backendUrl = "http://localhost:8000/api/";
var frontendUrl = "http://errorhandler.ddns.net/";
$(document).ready(function () {
  // Validate Session
  if (sessionStorage.getItem("jtwToken") === null) { window.location.replace(frontendUrl); }
  //Init Left panel
  $("#wrapper").toggleClass("toggle");
  loadData();

  $("#sendError").click(function () {
    var country_id = $('#countryId').val();
    var error_id = $('#errorId').val();
    $.ajax
      ({
        type: 'POST',
        url: backendUrl + 'error_log',
        dataType: 'JSON',
        data: { lead_id: $('#leadId').val(), country_id: country_id, error_id: error_id },
        success: function () {
          $('#leadId').val('');
          $('#countryId').val(country_id);
          $('#errorId').val(error_id);
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
  $.get( backendUrl + 'countries', function( data ) {
    $.each(data.data, function() {
      $('#countryId').append(new Option(this.name, this.id));
    });
  });
  $.get( backendUrl + 'errors', function( data ) {
    $.each(data.data, function() {
      $('#errorId').append(new Option(this.name, this.id));
    });
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