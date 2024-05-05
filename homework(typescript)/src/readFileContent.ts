const fs = require('fs');

export const readFileContent = (filePath: string) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return;
    }
}