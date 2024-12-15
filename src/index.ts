import  {Client} from "pg";
const pgClient = new Client("postgresql://neondb_owner:GzW1w6FkghXQ@ep-still-snowflake-a5wxkkte.us-east-2.aws.neon.tech/neondb?sslmode=require");
// i can also initailise it as the object 
// pehle connect krlo data base se then i will  run the commond and its take tiem to connect with data base so wrap inside in the async function 
// and await it ;
pgClient.connect();
import express from "express";

const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password =  req.body.password;
    try{
        const insertQuery = 'INSERT INTO users(username,email,password) VALUES ($1,$2,$3);'
        const response = await pgClient.query(insertQuery,[username,email,password])
        res.json({
            message:"you are signedup:"
        })
    }catch(e){
        console.log(e);
        res.json({
            message:"error while signup:"
        })
    }

})

app.listen(3000);