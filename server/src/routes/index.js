import express from "express";
import { CreateGraph, GetCities, GetRoutes } from "../controllers/mainController.js";


const router = express.Router();

router.get('/', (req, res) => {    
    res.json(
        {
            "Title": "AAAAAAAAAAAAAAAAA"
        }
    );
})

router.get("/getCities", GetCities)
router.get("/getRoutes", GetRoutes)
router.post("/createGraph", CreateGraph)
export default router;