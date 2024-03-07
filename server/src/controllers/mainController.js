import { Sequelize } from "sequelize";
import Cities from "../models/cityModel.js";
import Routes from "../models/routeModel.js";

export const GetCities = async(req, res) => {
    try{
        const cities = await Cities.findAll()
        res.json(cities)
    } catch(error){
        console.log(error)
    }
}

export const GetRoutes = async(req, res) => {
    try{
        const routes = await Routes.findAll()
        res.json(routes)
    } catch(error){
        console.log(error)
    }
}