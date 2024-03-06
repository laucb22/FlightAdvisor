import express from 'express';
import cors from "cors"
import bodyParser from "body-parser";
import router from '../index.js';
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
app.use(cors);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router)

app.listen(app.get("port"), ()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
