const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env if present
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const examplePath = path.resolve(__dirname, '../.env.example');
if (!fs.existsSync(examplePath)) {
  console.warn('\x1b[33m[EnvValidator] Warning: .env.example not found in root directory.\x1b[0m');
  process.exit(0);
}

const exampleContent = fs.readFileSync(examplePath, 'utf-8');
const expectedKeys = exampleContent
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => line.split('=')[0].trim());

const missingKeys = [];
const placeholderKeys = [];

for (const key of expectedKeys) {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    // Only flag client-critical keys as errors; optional keys are non-blocking
    const OPTIONAL_CLIENT_KEYS = ['NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN'];
    if (key.startsWith('NEXT_PUBLIC_') && !OPTIONAL_CLIENT_KEYS.includes(key)) {
      missingKeys.push(key);
    }
  } else if (
    value.includes('your_') ||
    value.includes('dummy') ||
    value.includes('placeholder')
  ) {
    if (key.startsWith('NEXT_PUBLIC_')) {
      placeholderKeys.push(key);
    }
  }
}

if (missingKeys.length > 0 || placeholderKeys.length > 0) {
  console.log('\n\x1b[33m=======================================================');
  console.log(' [Pre-Flight Warning] Environment Configuration Check');
  console.log('=======================================================\x1b[0m');

  if (missingKeys.length > 0) {
    console.log('\x1b[31m  Missing required client keys:\x1b[0m');
    missingKeys.forEach((k) => console.log(`    - ${k}`));
  }

  if (placeholderKeys.length > 0) {
    console.log('\x1b[33m  Keys using placeholder values:\x1b[0m');
    placeholderKeys.forEach((k) => console.log(`    - ${k}`));
  }

  console.log('\x1b[36m  Please refer to .env.example to configure these keys.\x1b[0m');
  console.log('\x1b[33m=======================================================\n\x1b[0m');
} else {
  console.log('\x1b[32m[Pre-Flight Check] All expected environment variables verified.\x1b[0m');
}
