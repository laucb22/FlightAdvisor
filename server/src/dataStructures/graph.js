import { Node } from "./node.js";
import { Edge } from "./edge.js";

export class Graph {

    constructor(){
        this.nodes = [];
    }


    findNode(node){
        for(let i = 0; i < this.nodes.length; i++){
            if(node.content == this.nodes[i].content){
                return i;
            }
        }
        return -1;
    }

    addNode(data){
        let newNode = new Node(data)
        if (this.findNode(newNode) != -1) {
            return "Node already exists";
        }
        this.nodes.push(newNode);
        return "Node added";
    }

    addEdge(dataSrc, dataDest, weight){
        let nodeSrcIndex = this.findNode(new Node(dataSrc));
        let nodeDestIndex = this.findNode(new Node(dataDest));

        if(nodeSrcIndex == -1 || nodeDestIndex == -1){
            return "Some of the nodes do not exist";
        }

        this.nodes[nodeSrcIndex].edges.push(new Edge(weight, this.nodes[nodeDestIndex]));
        this.nodes[nodeDestIndex].edges.push(new Edge(weight, this.nodes[nodeSrcIndex]));
        return "Edge added"
    }

    show() {
        let str = ""
        for(let i = 0; i < this.nodes.length; i++){
            str += "\\n NODE" + this.nodes[i].content;
            for(let j = 0; j < this.nodes[i].edges.length; j++){
                str += "\\n --->" + (this.nodes[i].edges[j].node.content) + " Weight: " + this.nodes[i].edges[j].weight;
            }
        }
        return str
    }


    allNodesVisited(visitedNodes) {

        for(let i = 0; i < visitedNodes.length; i++){
            if(!visitedNodes[i]) return false;
        }
        return true;
    }

    findShortestPath(startNode, endNode){
        let visitedNodes = [];
        let distances = [];
        let previousNodes = [];
        let startIndex = this.findNode(new Node(startNode));
        let endIndex = this.findNode(new Node(endNode));
        for(let i = 0; i < this.nodes.length; i++){
            visitedNodes[i] = false;
            distances[i] = i === startIndex ? 0 : Infinity;
            previousNodes[i] = null;
        }

        while(true){
            let currentNodeIndex = -1;
            let minDist = Infinity;
            for(let i = 0; i < this.nodes.length; i++){
                if (!visitedNodes[i] && distances[i] < minDist) {
                    minDist = distances[i];
                    currentNodeIndex = i;
                }

            }
            if(currentNodeIndex === -1) break 
            visitedNodes[currentNodeIndex] = true;
            for(let i = 0; i < this.nodes[currentNodeIndex].edges.length; i++){
                let neighborIndex = this.findNode(this.nodes[currentNodeIndex].edges[i].node);
                let newDist = distances[currentNodeIndex] + this.nodes[currentNodeIndex].edges[i].weight;
                if(newDist < distances[neighborIndex]){
                    distances[neighborIndex] = newDist;
                    previousNodes[neighborIndex] = currentNodeIndex;
                }
            }
        }

        return this.getPath(previousNodes, distances, startIndex, endIndex);



    }

    getPath(previousNodes, distances, startIndex, endIndex){
        let path = []
        let pathStr = " "
        let nodeIndex = endIndex;
        console.log(distances)
        console.log(startIndex + " " + endIndex)
        while(nodeIndex !== startIndex){
            path.push(nodeIndex);
            nodeIndex = previousNodes[nodeIndex];
        }

        path.push(startIndex)
        path = path.reverse()

        for(let i = 0; i < path.length; i++){
            path[i] = this.nodes[path[i]].content;
        }

        pathStr += "In order to travel from " + this.nodes[startIndex].content + " to " + this.nodes[endIndex].content + 
        + " with the shortest path of weight = " +  distances[endIndex] + ":";

        console.log(distances[endIndex])
        pathStr += "START: " + path[0];
        for(let i = 1; i < path.length; i++){
        
            pathStr += " --> " + path[i];
        }
        
        return pathStr;

    }


}