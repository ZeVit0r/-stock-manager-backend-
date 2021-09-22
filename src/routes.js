import { Router } from "express";
import ProductController from "./app/controllers/ProductController";
import TaskStringController from "./app/controllers/TaskStringController"
import ReportController from "./app/controllers/ReportController"
import cors from 'cors'

const routes = new Router();

routes.use(cors())

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.store);
routes.put("/products/", ProductController.update);
routes.delete("/products/", ProductController.delete);

routes.use("/products/reportCategories", ReportController.indexCategories);
routes.use("/products/reportProducts", ReportController.indexProducts);
routes.use("/products/reportProvides", ReportController.indexProvides);

routes.use("/taskString/:string", TaskStringController.show);



export default routes;