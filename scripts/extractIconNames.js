const fs = require('fs');
const path = require('path');

// Ruta al archivo index.mjs dentro de node_modules
const indexMjsPath = path.resolve(
  __dirname,
  '..', // Subir un nivel si el script está en 'scripts/'
  'node_modules',
  '@phosphor-icons',
  'react',
  'dist',
  'index.mjs'
);

// Verificar si el archivo existe
if (!fs.existsSync(indexMjsPath)) {
  console.error('No se encontró index.mjs. Verifica la instalación de @phosphor-icons/react.');
  process.exit(1);
}

// Leer el contenido del archivo index.mjs
const fileContent = fs.readFileSync(indexMjsPath, 'utf8');

// Expresión regular para capturar los nombres de los íconos
const iconRegex = /\b(?:[a-zA-Z0-9_$]+\s+as\s+)([a-zA-Z0-9_$]+)/g;

// Extraer los nombres de los íconos
const iconNames = [];
let match;
while ((match = iconRegex.exec(fileContent)) !== null) {
  iconNames.push(match[1]); // match[1] contiene el nombre real del ícono
}

// Guardar la lista de nombres de íconos en un archivo JSON
const outputPath = path.resolve(__dirname, 'iconNames.json');
fs.writeFileSync(outputPath, JSON.stringify(iconNames, null, 2));

console.log(`Se han extraído ${iconNames.length} nombres de íconos.`);
