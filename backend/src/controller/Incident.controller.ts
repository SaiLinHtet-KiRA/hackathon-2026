import { Request, Response } from "express";
import IncidentControllerType from "./Incident.controller.type";
import { IncidentType } from "../model/Incident.model";
import IncidentService from "../service/Incident.service";
import SearchQuery from "../Types/Query";

class IncidentController implements IncidentControllerType {
  async createIncident(
    req: Request<null, null, IncidentType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const incident = await IncidentService.createIncident(req.body);
      res.status(200).json(incident);
    } catch (error) {
      throw error;
    }
  }
  async getIncident(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const incident = await IncidentService.getIncident(id);

      res.status(200).json(incident);
    } catch (error) {
      throw error;
    }
  }
  async getIncidents(
    req: Request<null, null, null, SearchQuery<IncidentType>>,
    res: Response,
  ): Promise<void> {
    try {
      const query = req.query;

      const incidents = await IncidentService.getIncidents(query);

      res.status(200).json(incidents);
    } catch (error) {
      throw error;
    }
  }
  async updateIncident(
    req: Request<{ id: string }, null, IncidentType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const Incident = await IncidentService.updateIncident(id, body);
      res.status(200).json(Incident);
    } catch (error) {
      throw error;
    }
  }
  async deleteIncident(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Incident = await IncidentService.deleteIncident(id);
      res.status(200).json(Incident);
    } catch (error) {
      throw error;
    }
  }
}

export default new IncidentController();
