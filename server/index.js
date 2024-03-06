import express from "express";


const router = express.Router();

router.get('/', (req, res) => {    
    res.json(
        {
            "Title": "Hola mundo usando rutas!"
        }
    );
})


export default router;