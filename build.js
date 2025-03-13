require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Environment variables with defaults
const config = {
    APP_SCHEME: process.env.APP_SCHEME || 'com.gimconnect.app.staging',
    IOS_STORE_URL: process.env.IOS_STORE_URL || 'https://apps.apple.com/app/[YOUR_APP_ID]',
    ANDROID_STORE_URL: process.env.ANDROID_STORE_URL || 'https://play.google.com/store/apps/details?id=com.gimconnect.app',
    APP_LAUNCH_TIMEOUT: process.env.APP_LAUNCH_TIMEOUT || 2500,
};

console.log("USING CONFIG", JSON.stringify(config, null, 2));

// Generate the config file content
const configContent = `// This file is auto-generated. Do not edit directly.
const config = ${JSON.stringify(config, null, 2)};`;

// Ensure the dist/js directory exists
const distDir = path.join(__dirname, 'dist');
const jsDir = path.join(distDir, 'js');

// Clean dist directory if it exists
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
}

// Create dist and js directories
fs.mkdirSync(jsDir, { recursive: true });

// Copy static files from public to dist
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
    const copyDir = (src, dest) => {
        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                fs.mkdirSync(destPath, { recursive: true });
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    };

    copyDir(publicDir, distDir);
}

// Write the config file
fs.writeFileSync(path.join(jsDir, 'config.js'), configContent);

console.log('Build completed successfully!');