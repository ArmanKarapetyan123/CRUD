import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const readProduct = (filePath) => {
    const jsonPath = path.join(__dirname, ...filePath.split('/'));
    try {
        const data = fs.readFileSync(jsonPath, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData;
    }
    catch (error) {
        throw error;
    }
};
export const writeProduct = (filePath, data) => {
    const jsonPath = path.join(__dirname, ...filePath.split('/'));
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(jsonPath, jsonData, "utf8");
    }
    catch (error) {
        throw error;
    }
};
export const createId = (jsonData) => {
    const maxId = Math.max(...jsonData.products.map((product) => parseInt(product.id)));
    return (maxId + 1).toString();
};
