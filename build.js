const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
const distDir = path.join(__dirname, 'dist');

// Clean dist directory if it exists
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
}

// Create dist directory
fs.mkdirSync(distDir, { recursive: true });

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

console.log('Build completed successfully!');