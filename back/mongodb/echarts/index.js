import { Schema } from "mongoose";
import { mongo_echart } from "../index.js";

const echartSchema = new Schema({
    name: String,
    updatedAt: { type: Date, default: Date.now },
    isStatic: {
        type: Boolean,
        default: false
    },
    isdel: {
        type: Boolean,
        default: false
    },
    optionStr: String,
    base64: String
}, { strict: false })

const Echart = mongo_echart.model('echart', echartSchema);

export default Echart