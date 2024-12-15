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
    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;


    try{
        const insertQuery = 'INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING id;'
        const addressQuery = 'INSERT INTO addresses(city,country,street,pincode,user_id) VALUES ($1,$2,$3,$4,$5)'
        await pgClient.query("BEGIN");
        const response = await pgClient.query(insertQuery,[username,email,password]) ;
        const userId = response.rows[0].id; 
        const responseAddressQuery = await pgClient.query(addressQuery,[city,country,street,pincode,userId]);
        await pgClient.query("COMMIT");
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