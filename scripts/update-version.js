const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');

const updatePatchVersion = () => {
  
  const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const currentVersion = packageData.version;
  const [major, minor, patch] = currentVersion.split('.');

  const newPatch = (parseInt(patch, 10) + 1).toString();

  const newVersion = `${major}.${minor}.${newPatch}`;

  packageData.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));

  console.log(`Versión actualizada de ${currentVersion} a ${newVersion}`);
};

updatePatchVersion();
