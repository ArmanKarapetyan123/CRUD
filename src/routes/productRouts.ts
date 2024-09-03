import {Router} from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById
} from "../controllers/productsController";

export const ProductRouter = Router();

ProductRouter.get("/" , getProducts)
ProductRouter.get("/:id" , getProductById)
ProductRouter.post("/" , createProduct)
ProductRouter.put("/:id" , updateProductById)
ProductRouter.delete("/:id" , deleteProductById)
