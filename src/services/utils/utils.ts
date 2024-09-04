import fs from 'fs';
import { ProductJson } from '../Interfaces/productInterface';
import path from "node:path";
const dirname: string = path.resolve();

export const readProduct = (filePath: string) : ProductJson =>  {

    const jsonPath = path.join(dirname, filePath);
    try {
        const data = fs.readFileSync(jsonPath, 'utf8');
        const parsedData = JSON.parse(data) as ProductJson;
        return parsedData;
    }catch (error) {
        throw error;
    }
}
export const writeProduct = (filePath: string, data: ProductJson) : void =>  {
    const jsonPath = path.join(__dirname, filePath);
    
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(jsonPath, jsonData, "utf8")

    }catch (error) {
        throw error;
    }
}

export const createId = (jsonData : ProductJson) : string => {
    const maxId = Math.max(...jsonData.products.map((product) => parseInt(product.id) ));
    return (maxId + 1).toString();
} 

