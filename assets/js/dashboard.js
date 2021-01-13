$(document).ready(function(){
    if(sessionStorage.getItem("jtwToken") === null){window.location.replace("http://localhost:5000");}
});