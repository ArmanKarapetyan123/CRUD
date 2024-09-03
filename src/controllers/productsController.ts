import { Request, Response } from "express";

import {createId , readProduct, writeProduct} from "../services/utils/utils"
import {Product, ProductJson} from "../services/Interfaces/productInterface"

const databasePath : string = "../../../database/products.json" ;

export const getProducts = async (req: Request, res: Response) => {
    try {
        const {category , isDeleted} = req.query;
        
        let products : Product[] = readProduct(databasePath).products
        if(category){
            products = products.filter(product => product.category === category)
            console.log(products)
        }
        if (isDeleted) {
            const isDeletedItem: boolean = isDeleted === 'true';
            products = products.filter((product) => product.deleted === isDeletedItem);
        }
        res.status(200).json(products)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message : error.message})
        }
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const jsonData = readProduct(databasePath);
        const product = jsonData.products.find(product => product.id == id)
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({message : "Product not found"})
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message : error.message})
        }
    }
}

export const createProduct = async(req: Request, res: Response) : Promise<void>=> {
    try {
        const newProduct: Product = req.body;

        if(newProduct.stock.available < 0 ){
            res.status(406).json({message : "Stock must be non-negative integer"})
            return;
        }
        if(newProduct.price < 0){
            res.status(406).json({message : "Price must be positive integer"})
            return;
        }
        const jsonData : ProductJson = readProduct(databasePath);
        newProduct.id = createId(jsonData);
        newProduct.deleted = false;

        jsonData.products.push(newProduct);
        writeProduct(databasePath, jsonData);

        res.status(201).json(newProduct);
    }catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message : error.message})
        }
    }
}

export const updateProductById = async(res:Response, req:Request) => {
    try {
        const { id } = req.params;
        const updatedProduct: Partial<Product> = req.body;
        const jsonData : ProductJson = readProduct(databasePath);
        const products:Product[] = jsonData.products;
        const updId = products.findIndex(product => product.id === id);

        if (updId === -1) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const existingProduct: Product = products[updId];

        if(updatedProduct?.stock?.available){
            if(updatedProduct.stock.available < 0 ){
                res.status(406).json({message : "Stock must be non-negative integer"})
                return;
            }
        }  

            if(updatedProduct?.price && updatedProduct?.price < 0 ){
                res.status(406).json({message : "Price must be positive integer"})
                return;
            }
        
        const finallUpdatedProduct : Product = {
            ...existingProduct,
            ...updatedProduct
        }
        products[updId] = finallUpdatedProduct;
        
        writeProduct(databasePath, jsonData);

        res.status(201).json(finallUpdatedProduct);
    }catch (error) {
            res.status(404).json({message : error.message})
    }
}

export const deleteProductById = async ( req: Request, res:Response ) => {
    try{
        const {id} = req.params;
        const jsonData : ProductJson = readProduct(databasePath);
        const products : Product[] = jsonData.products;
        const updId = products.findIndex(product => product.id === id);

        if (updId === -1) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const deletedProduct: Product = products[updId];
        deletedProduct.deleted = true;

        writeProduct(databasePath, jsonData);
        res.status(201).json(deletedProduct);
    }catch (error) {
            res.status(404).json({message : error.message})
    }
}