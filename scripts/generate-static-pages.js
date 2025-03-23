const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create the scripts directory if it doesn't exist
try {
  fs.mkdirSync('scripts');
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

// Create directories for static HTML output
const outputDir = 'static-html';
try {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'prophet-stories'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'quran-stories'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'khaleefa-stories'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'swahabi-stories'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'other-stories'), { recursive: true });
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

// Copy the index.html
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Islamic History</title>
  <meta http-equiv="refresh" content="0;url=./out/index.html">
</head>
<body>
  <h1>Islamic History</h1>
  <p>Redirecting to the main site...</p>
  <p>If you are not redirected, <a href="./out/index.html">click here</a>.</p>
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);

// Create a 404.html
const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Islamic History</title>
  <meta http-equiv="refresh" content="3;url=/">
</head>
<body>
  <h1>Page Not Found</h1>
  <p>The page you requested could not be found.</p>
  <p>Redirecting to the home page...</p>
  <p>If you are not redirected, <a href="/">click here</a>.</p>
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, '404.html'), notFoundHtml);

// Copy CNAME and .nojekyll
if (fs.existsSync('CNAME')) {
  fs.copyFileSync('CNAME', path.join(outputDir, 'CNAME'));
}
fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');

console.log('Static HTML generation complete.');

// Optional: Automatically commit and deploy
// execSync('git add static-html');
// execSync('git commit -m "Generate static HTML files"');
// execSync('git push'); 