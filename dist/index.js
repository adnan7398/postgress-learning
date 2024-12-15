"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgClient = new pg_1.Client("postgresql://neondb_owner:GzW1w6FkghXQ@ep-still-snowflake-a5wxkkte.us-east-2.aws.neon.tech/neondb?sslmode=require");
// i can also initailise it as the object 
// pehle connect krlo data base se then i will  run the commond and its take tiem to connect with data base so wrap inside in the async function 
// and await it ;
pgClient.connect();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const insertQuery = 'INSERT INTO users(username,email,password) VALUES ($1,$2,$3);';
        const response = yield pgClient.query(insertQuery, [username, email, password]);
        res.json({
            message: "you are signedup:"
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "error while signup:"
        });
    }
}));
app.listen(3000);
