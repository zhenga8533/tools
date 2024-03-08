// Remove hash from links
$(window).on('hashchange', function(e){
    history.replaceState ("", document.title, e.originalEvent.oldURL);
});

// Dynamically load pages
$(document).ready(function() {
    // Load default content (e.g., home.html)
    $('#main-content').load('content/pages/home.html', function() {
        loadJavaScript('home');
    });

    // Function to load content based on clicked link
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const page = $(this).attr('href');
        $('#main-content').load(page, function() {
            var mainContent = page.split('/').pop().split('.')[0]; // Extract the main content name from the URL
            loadJavaScript(mainContent);
        });
    });

    // Function to load JavaScript specific to each main section
    function loadJavaScript(mainContent) {
        // Remove previously loaded script
        $('script[src^="js/"]').remove();

        if (mainContent !== 'home') {
            var script = document.createElement('script');
            script.src = 'js/' + mainContent + '.js';
            document.body.appendChild(script);
        }
    }
});