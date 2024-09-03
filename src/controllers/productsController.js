var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createId, readProduct, writeProduct } from "../services/utils/utils";
const databasePath = "../../database/products.json";
console.log(`database is ::: ${databasePath}`);
export const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, isDeleted } = req.query;
        console.log("hello");
        let products = readProduct(databasePath).products;
        if (category) {
            products = products.filter(product => product.category === category);
            console.log(products);
        }
        if (isDeleted) {
            const isDeletedItem = isDeleted === 'true';
            products = products.filter((product) => product.deleted === isDeletedItem);
        }
        res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
export const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const jsonData = readProduct(databasePath);
        const product = jsonData.products.find(product => product.id == id);
        if (product) {
            res.status(200).json(product);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
});
export const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = req.body;
        if (newProduct.stock.available < 0) {
            res.status(406).json({ message: "Stock must be non-negative integer" });
            return;
        }
        if (newProduct.price < 0) {
            res.status(406).json({ message: "Price must be positive integer" });
            return;
        }
        const jsonData = readProduct(databasePath);
        newProduct.id = createId(jsonData);
        newProduct.deleted = false;
        jsonData.products.push(newProduct);
        writeProduct(databasePath, jsonData);
        res.status(201).json(newProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
});
export const updateProductById = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        const jsonData = readProduct(databasePath);
        const products = jsonData.products;
        const updId = products.findIndex(product => product.id === id);
        if (updId === -1) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const existingProduct = products[updId];
        if ((_a = updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.stock) === null || _a === void 0 ? void 0 : _a.available) {
            if (updatedProduct.stock.available < 0) {
                res.status(406).json({ message: "Stock must be non-negative integer" });
                return;
            }
        }
        if ((updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.price) && (updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.price) < 0) {
            res.status(406).json({ message: "Price must be positive integer" });
            return;
        }
        const finallUpdatedProduct = Object.assign(Object.assign({}, existingProduct), updatedProduct);
        products[updId] = finallUpdatedProduct;
        writeProduct(databasePath, jsonData);
        res.status(201).json(finallUpdatedProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
});
export const deleteProductById = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const jsonData = readProduct(databasePath);
        const products = jsonData.products;
        const updId = products.findIndex(product => product.id === id);
        if (updId === -1) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const deletedProduct = products[updId];
        deletedProduct.deleted = true;
        writeProduct(databasePath, jsonData);
        res.status(201).json(deletedProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
});
