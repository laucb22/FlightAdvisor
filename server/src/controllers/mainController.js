import { Sequelize } from "sequelize";
import Cities from "../models/cityModel.js";
import Routes from "../models/routeModel.js";
import { Graph } from "../dataStructures/graph.js";
import QueryTypes from "sequelize";
import db from "../config/database.js";



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


export const CreateGraph = async(req, res) => {
    try{
        const {src, dest} = req.body;
        console.log(req.body)
        const citySrc = await Cities.findOne({
            where: {
                name: src
            }
        })
        const cityDest = await Cities.findOne({
            where:{
                name: dest
            }
        })

        if(!citySrc || !cityDest) res.status(404).json("Failed to find one or either of the cities");

        let cities = await db.query(
            'SELECT c.name as src, c2.name as dest, r.transit, r.weather, r.animals  FROM cities c JOIN routes r on c.id = r.cityId JOIN cities c2 on r.city2Id = c2.id;',
            {type: Sequelize.QueryTypes.SELECT}
        )
        

        let graph = new Graph();
        for(let i = 0; i < cities.length; i++){
            graph.addNode(cities[i].src);
            graph.addNode(cities[i].dest);
            let weight = cities[i].transit + cities[i].weather + cities[i].animals;
            graph.addEdge(cities[i].src, cities[i].dest, weight);
        }
        
        res.json({"next": graph.findShortestPath(src, dest)});        



    } catch(error){
        console.log(error)
    }
}