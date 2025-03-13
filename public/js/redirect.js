document.addEventListener('DOMContentLoaded', () => {
    // Get the path from the URL (everything after the domain)
    const path = window.location.pathname;

    // Detect platform
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    // Construct the deep link URL
    const deepLink = `${config.APP_SCHEME}://${path}`;

    // Function to redirect to app store
    function redirectToStore() {
        if (isIOS) {
            window.location.href = config.IOS_STORE_URL;
        } else  {
            window.location.href = config.ANDROID_STORE_URL;
        }
    }

    // Try to open the app
    function tryOpenApp() {
        // Set a timeout to redirect to store if app doesn't open
        const timeout = setTimeout(() => {
            redirectToStore();
        }, config.APP_LAUNCH_TIMEOUT);

        // Try to open the app
        window.location.href = deepLink;

        // Listen for visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                clearTimeout(timeout);
            }
        });
    }

    // Start the redirection process
    tryOpenApp();
});