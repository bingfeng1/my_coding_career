import { Schema } from "mongoose";
import { mongo_visual } from "../index.js";

const dictItemSchema = new Schema({
    key: String,
    value: String,
    isdel: {
        type: Boolean,
        default: false
    },
    desc: String
})

const dictSchema = new Schema({
    key: String,
    value: String,
    isdel: {
        type: Boolean,
        default: false
    },
    desc: String,
    children: [dictItemSchema]
})

const Dict = mongo_visual.model('dict', dictSchema);

export default Dict