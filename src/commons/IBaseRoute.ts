import express from "express"

export default abstract class BaseRoute  {
    
    name : string;
    constructor(name:string) {
        this.name = name;
    }

    abstract registerRoute(app: express.Application): void;
}