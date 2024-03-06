import router from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors"
import  express from "express";


const app = express();

app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);
app.use(cors)


app.listen(app.get("port"), ()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

