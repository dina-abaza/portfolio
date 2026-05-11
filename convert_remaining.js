const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function convertToWebp() {
  const allFiles = getAllFiles(publicDir);
  const imageFiles = allFiles.filter(file => 
    file.endsWith('.png') || 
    file.endsWith('.jpg') || 
    file.endsWith('.jpeg')
  );

  console.log(`Found ${imageFiles.length} image files to convert.`);

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const output = file.replace(ext, '.webp');
    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(output);
      console.log(`Converted: ${file} -> ${output}`);
      fs.unlinkSync(file);
      console.log(`Deleted original: ${file}`);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }
}

convertToWebp();
