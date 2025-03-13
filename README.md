# GIM Connect Web Redirect

This is a simple web application that handles shared links from the GIM Connect mobile app. It redirects users to either:
- The mobile app (if installed)
- The App Store (iOS users)
- The Play Store (Android users)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your configuration:
   ```bash
   # App Configuration
   APP_SCHEME=your.app.scheme
   IOS_STORE_URL=https://apps.apple.com/app/[YOUR_APP_ID]
   ANDROID_STORE_URL=https://play.google.com/store/apps/details?id=your.bundle.id
   APP_LAUNCH_TIMEOUT=2500
   ```

## Development

To start the development server:
```bash
npm run dev
```

This will:
1. Build the project with your current environment variables
2. Start a local server at `http://localhost:3000`

The server will handle all routes correctly for testing deep links.

## Production Deployment

### Netlify

1. Connect your repository to Netlify

2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. Add environment variables in Netlify's dashboard (Settings > Build & deploy > Environment):
   ```bash
   APP_SCHEME=your.app.scheme
   BUNDLE_ID=your.bundle.id
   IOS_STORE_URL=your-ios-store-url
   ANDROID_STORE_URL=your-android-store-url
   APP_LAUNCH_TIMEOUT=2500
   BASE_DOMAIN=your-domain.com
   ```

The `_redirects` file is already included in the build, so all routes will work correctly on Netlify.

## Configuration Options

- `APP_SCHEME`: Your app's URL scheme (e.g., 'com.gimconnect.app.staging')
- `IOS_STORE_URL`: URL to your app in the App Store
- `ANDROID_STORE_URL`: URL to your app in the Play Store
- `APP_LAUNCH_TIMEOUT`: Time to wait before redirecting to stores (in milliseconds)

## Testing

To test the deep linking:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/publication/8757ce37-56e9-4ad8-b811-c6cb5c0abb47` in your browser.

3. The page should attempt to open your app with the deep link and fall back to the store if the app isn't installed.

Note: For testing on mobile devices, you'll need to:
- Use HTTPS (required for iOS universal links)
- Access the page through your local network IP or a tunnel service like ngrok