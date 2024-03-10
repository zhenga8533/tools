$(document).ready(function() {
    // Load default content (e.g., home.html)
    $('#main-content').load('content/pages/home.html', function() {
        loadJavaScript('home');
    });

    // Function to load content based on clicked link
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();
        const page = $(this).attr('href');
        $('#main-content').load(page, function() {
            const mainContent = page.split('/').pop().split('.')[0]; // Extract the main content name from the URL
            loadJavaScript(mainContent);
        });
    });

    // Function to load JavaScript specific to each main section
    function loadJavaScript(mainContent) {
        // Remove previously loaded script
        $('script[src^="js/"]').remove();

        // Clear all event listeners and intervals
        for (let i = 1; i < 99; i++) window.clearInterval(i);

        if (mainContent !== 'home') {
            const script = document.createElement('script');
            script.src = 'js/' + mainContent + '.js';
            document.body.appendChild(script);
        }
    }
});
