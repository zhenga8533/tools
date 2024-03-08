// Remove hash from links
$(window).on('hashchange', function(e){
    history.replaceState ("", document.title, e.originalEvent.oldURL);
});

// Dynamically load pages
$(document).ready(function() {
    // Load default content (e.g., home.html)
    $('#main-content').load('content/pages/home.html');

    // Function to load content based on clicked link
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const page = $(this).attr('href');
        $('#main-content').load(page);
    });
});