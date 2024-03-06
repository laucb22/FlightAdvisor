import express from "express";


const router = express.Router();

router.get('/', (req, res) => {    
    res.json(
        {
            "Title": "AAAAAAAAAAAAAAAAA"
        }
    );
})


export default router;