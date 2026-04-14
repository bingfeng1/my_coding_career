import mongoose from "mongoose";
import { ENV_IP } from "../utils/env.js";

let mongo_visual;
let mongo_echart;

let host = process.env.mongodb || ENV_IP
let url = `mongodb://root:root@${host}:27017/visual`
mongo_visual = mongoose.createConnection(url)
console.log('mongo_visual连接成功');


let url2 = `mongodb://root:root@${host}:27017/echarts`
mongo_echart = mongoose.createConnection(url2)
console.log('mongo_chart连接成功');

export {
    mongo_visual,
    mongo_echart
}