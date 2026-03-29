import { Request, Response } from "express";
import { IncidentType } from "../model/Incident.model";
import SearchQuery from "../Types/Query";

export default interface IncidentControllerType {
  createIncident(
    req: Request<null, null, IncidentType, null>,
    res: Response,
  ): Promise<void>;
  getIncidents(
    req: Request<null, null, null, SearchQuery<IncidentType>>,
    res: Response,
  ): Promise<void>;
  getIncident(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
  updateIncident(
    req: Request<{ id: string }, null, IncidentType, null>,
    res: Response,
  ): Promise<void>;
  deleteIncident(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
