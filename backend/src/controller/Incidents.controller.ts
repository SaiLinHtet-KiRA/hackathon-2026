import { Request, Response } from "express";
import SearchQuery from "../Types/Query";
import IncidentsControllerType from "./Incidents.controller.type";
import { IncidentType } from "../model/Incident.model";
import { IncidentsType } from "../model/Incidents.model";
import IncidentsService from "../service/Incidents.service";

class IncidentsController implements IncidentsControllerType {
  async getIncidents(
    req: Request<{ id: string }, null, null, SearchQuery<IncidentType>>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const query = req.query;
      const Incidents = await IncidentsService.getIncidents(id, query);
      res.status(200).json(Incidents);
    } catch (error) {
      throw error;
    }
  }

  async updateIncidents(
    req: Request<{ id: string }, null, IncidentsType, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const cctv = await IncidentsService.updateIncidents(id, body);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
  async deleteIncidents(
    req: Request<{ id: string }, null, null, null>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const cctv = await IncidentsService.deleteIncidents(id);
      res.status(200).json(cctv);
    } catch (error) {
      throw error;
    }
  }
}

export default new IncidentsController();
