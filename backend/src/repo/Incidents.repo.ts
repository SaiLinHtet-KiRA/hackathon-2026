import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import IncidentModel, { IncidentDocument } from "../model/Incident.model";
import IncidentsRepoType from "./Incidents.repo.type";
import SearchQuery from "../Types/Query";
import IncidentsModel, {
  IncidentsDocument,
  IncidentsType,
} from "../model/Incidents.model";
import { populate } from "dotenv";
import ReportModel from "../model/Report.model";

class IncidentsRepo implements IncidentsRepoType {
  async create(data: Partial<IncidentsType>): Promise<IncidentsDocument> {
    try {
      const newIncidents = new IncidentsModel();
      return await newIncidents.save();
    } catch (error) {
      throw error;
    }
  }
  async get(
    id: string,
    query: SearchQuery<IncidentDocument>,
  ): Promise<IncidentsDocument> {
    try {
      const incident = await IncidentsModel.findById(id).populate({
        path: "incidents",
        model: IncidentModel,
        options: {
          populate: {
            path: "linkedWitnesses",
            populate: {
              path: "reports",
              model: ReportModel,
            },
          },
        },
      });
      if (!incident) throw new NotFoundError(`${id} was not found Incidents.`);
      return incident;
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    query: UpdateQuery<IncidentsType>,
  ): Promise<IncidentsDocument> {
    try {
      const incidents = await IncidentsModel.findByIdAndUpdate(id, query);
      if (!incidents) throw new NotFoundError(`${id} was not found Incidents`);
      return incidents;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<IncidentsDocument> {
    try {
      const incidents = await IncidentsModel.findByIdAndDelete(id);
      if (!incidents) throw new NotFoundError(`${id} was not found Incidents`);
      return incidents;
    } catch (error) {
      throw error;
    }
  }
}

export default new IncidentsRepo();
