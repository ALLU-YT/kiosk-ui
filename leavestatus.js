document.addEventListener('DOMContentLoaded', function() {
    var leaveType = document.querySelector('.leave_type');

    function toggleFirstDiv() {
        var firstDiv = document.getElementById('firstDiv');
        var nodata = document.getElementById('nodata');
        if (leaveType.classList.contains('active')) {
            firstDiv.style.display = 'block';
            nodata.style.display = "none";
            
        } else {
            firstDiv.style.display = 'none';
            nodata.style.display = "block";
        }
    }

    toggleFirstDiv(); // Call the function initially to set the correct display

    // Listen for changes in the .leave_type class
    leaveType.addEventListener('click', function() {
        toggleFirstDiv(); // Call the function when the class is clicked to toggle display
    });
});


$('.leave_type').on('click', function() {
    $('.leave_type').removeClass('active');
    $(this).addClass('active');
})





function openLanguage(language) {
    var i;
    var x = document.getElementsByClassName("city ");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none ";
    }
    document.getElementById(language).style.display = "block ";
}