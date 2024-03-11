$(document).ready(function() {
    // Load default content (e.g., home.html)
    $('#main-content').load('content/pages/home.html', function() {
        loadJavaScript('', 'home');
    });

    // Function to load content based on clicked link
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();
        const page = $(this).attr('href');
        $('#main-content').load(page, function() {
            const path = page.split('/');
            const file = path.pop().split('.')[0];
            const directory = path.pop();
            loadJavaScript(directory, file);
        });
    });

    // Function to load JavaScript specific to each main section
    function loadJavaScript(directory, file) {
        // Remove previously loaded script
        $('script[src^="js/"]').remove();

        // Clear all event listeners and intervals
        for (let i = 1; i < 99; i++) window.clearInterval(i);

        if (file !== 'home') {
            const script = document.createElement('script');
            script.src = `js/${directory}/${file}.js`;
            document.body.appendChild(script);
        }
    }
});
