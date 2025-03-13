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
        } else {
            window.location.href = config.ANDROID_STORE_URL;
        }
    }

    // Try to open the app
    function tryOpenApp() {
        let redirected = false;
        const now = Date.now();

        // Handle app launch success
        const handleAppLaunched = () => {
            redirected = true;
            clearTimeout(timeout);
        };

        // Set a timeout to redirect to store if app doesn't open
        const timeout = setTimeout(() => {
            if (!redirected) {
                // Double check if enough time has passed (Android needs this)
                const timePassed = Date.now() - now;
                if (timePassed < config.APP_LAUNCH_TIMEOUT) {
                    return;
                }
                redirectToStore();
            }
        }, config.APP_LAUNCH_TIMEOUT);

        // Listen for visibility and focus changes
        window.addEventListener('blur', handleAppLaunched);
        window.addEventListener('pagehide', handleAppLaunched);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                handleAppLaunched();
            }
        });

        // For Android: If we're still here after a brief timeout, the app probably doesn't exist
        if (isAndroid) {
            setTimeout(() => {
                if (document.hidden) {
                    handleAppLaunched();
                }
            }, 100);
        }

        // Try to open the app using an iframe for better compatibility
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = deepLink;
        document.body.appendChild(iframe);

        // Also try with window.location as fallback
        setTimeout(() => {
            window.location.href = deepLink;
        }, 100);
    }

    // Start the redirection process
    tryOpenApp();
});