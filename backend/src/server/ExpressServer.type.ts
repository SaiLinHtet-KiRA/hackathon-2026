import { Express } from "express"

export default interface ExpressServerType{
    app :  Express;
    startServer(): void
}