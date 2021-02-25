$(document).ready(function(){
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#loginButton").click(function(){
        alert('login');
        var email = $( "#email" ).val();
        var password = $( "#password" ).val();
        $.ajax
        ({ 
            url: 'http://localhost:8000/api/auth/login',
            data: {"email": email,"password":password},
            type: 'post',
            dataType: "JSON",
            success: function(result)
            {
                if (window.sessionStorage) {
                    // console.log(result);
                    sessionStorage.setItem("id", result.user.id);
                    sessionStorage.setItem("name", result.user.name);
                    sessionStorage.setItem("jtwToken", result.access_token);
                    window.location.replace("http://localhost/app/dashboard.html");
                }
            },
            error: function (xhr)
            {
                console.log(xhr.responseJSON);
            }
        });
    });

    $("#logoutButton").click(function(){
        $.ajax
        ({ 
            url: 'http://localhost:8000/api/auth/logout',
            type: 'POST',
            dataType: "JSON",
            success: function(result)
            {
                if (window.sessionStorage) {
                    // console.log(result);
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("name");
                    sessionStorage.removeItem("jtwToken");
                    window.location.replace("http://localhost/");
                }
            },
            error: function (xhr)
            {
                console.log(xhr.responseJSON);
            }
        });
    });

    
});


$('.login-reg-panel input[type="radio"]').on('change', function() {
    if($('#log-login-show').is(':checked')) {
        $('.register-info-box').fadeOut(); 
        $('.login-info-box').fadeIn();
        
        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');
        
    }
    else if($('#log-reg-show').is(':checked')) {
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();
        
        $('.white-panel').removeClass('right-log');
        
        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
});