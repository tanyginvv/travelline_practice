"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileContent = void 0;
const fs = require('fs');
const readFileContent = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    }
    catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return;
    }
};
exports.readFileContent = readFileContent;
