
import { Schema, model } from "mongoose";
import { GenericType } from "../constants/generic_type.enum";
import { LogType } from "../constants/Log_Type.enum";
import { ActionKey } from "../constants/action_key.enum";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


const loggerSchema = new Schema({
  user_id: {
    type: String,
  },
  device_id: {
    type: String,
  },
  generic_id: {
    type: String,
  },
  generic_type: {
    type: String,
    enum: Object.values(GenericType),
  },
  action_key: {
    type: Number,
    enum: ActionKey,
  },
  action_value: {
    type: String,
  },
  log_type: {
    type: Number,
    enum: LogType,
  }
}, { timestamps: true});
loggerSchema.plugin(aggregatePaginate);
const LOGGER = model('LOGGER', loggerSchema);

export default LOGGER;