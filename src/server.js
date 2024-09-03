import express from "express";
import { ProductRouter } from "./routes/productRouts";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/products", ProductRouter);
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/products`);
});
