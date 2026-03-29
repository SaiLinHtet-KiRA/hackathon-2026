import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import { IncidentType } from "../model/Incident.model";
import { IncidentsType } from "../model/Incidents.model";

export default interface IncidentsControllerType {
  getIncidents(
    req: Request<{ id: string }, null, null, SearchQuery<IncidentType>>,
    res: Response,
  ): Promise<void>;
  updateIncidents(
    req: Request<{ id: string }, null, IncidentsType, null>,
    res: Response,
  ): Promise<void>;
  deleteIncidents(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void>;
}
