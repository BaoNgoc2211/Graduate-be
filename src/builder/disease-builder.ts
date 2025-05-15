import { paginate } from "../util/response";
import { PipelineStage } from "mongoose";

class DiseaseQueryBuilder {
  private pipeline: PipelineStage[] = [];
  private paginateStages: PipelineStage[] = [];
}
