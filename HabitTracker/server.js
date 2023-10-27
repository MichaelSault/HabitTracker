const express = require('express'),
    dbOperation = require('./backend/dbOperations'),
    JWT = require('./backend/JWT'),
    cors = require('cors'),
    mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//eventually this should be removed due to security issues but while testing I'll leave it
mongoose.connect(process.env.DB_CONN).catch(err => console.log(err));

//DB SCHEMA AND MODEL
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

const habitSchema = mongoose.Schema({
    habitName: String,
    userID: String,
    frequency: Number,
    timePeriod: Number,
    validDays: Array
});

const habitLogSchema = mongoose.Schema({
    habitID: String,
    logDate: Date,
    comment: String
})

const secretSchema = mongoose.Schema({
    JWTSecret: String
});

const Users = mongoose.model("Users", userSchema);

const Habits = mongoose.model("Habits", habitSchema);

const Logs = mongoose.model("Logs", habitLogSchema);

const Secrets = mongoose.model("Secrets", secretSchema);

app.get("/", (req, res) => {
    res.send("Express is here");
});

////////////////////////////////////////////////////
////////////////db Functions////////////////////////
////////////////////////////////////////////////////

//adds a new user to the database
app.post("/SignUpUser", async (req, res) => {    
    Users.create({
        username: req.body.email,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).then(doc => console.log(doc))
    .catch(err => console.log(err));
});

//checks is a user exists in the database
app.post('/loginUser', async(req, res) => {
    const result = await dbOperation.loginUser(req.body);
    console.log("Returned From Query");
});

//adds a new habit to the database
app.post("/CreateHabit", async (req, res) => {    
    Habits.create({
        habitTitle: String,

    }).then(doc => console.log(doc))
    .catch(err => console.log(err));
});


////////////////////////////////////////////////////
////////////////JWT Functions///////////////////////
////////////////////////////////////////////////////

//returns data from JWT payload
app.post('/decodeJWT', async(req, res) => {
    //set Secret
    const secret = await Secrets.find()
        .catch((err) => console.log(err));

    const secretKey = secret[0].JWTSecret;

    //set JWT
    const jwtToVerify = req.body.Token;
    //validate JWT
    const validated = await JWT.verifyJWT(jwtToVerify, secretKey);
    console.log(validated);
    //if valid, decode the payload
    if (validated){
        console.log("JWT to decode: " + jwtToVerify);
        const decoded = await JWT.decodeJWT(jwtToVerify);
        console.log("decoded token: " + decoded);
        res.send(decoded);
    } else {
        throw new Error("Invalid Signature!");
    }
});

app.post('/JWT', async(req, res) => {
    console.log("==========================================called JWT on server.js==========================================");
    //set Secret
    const secret = await Secrets.find()
        .catch((err) => console.log(err));
    
    const secretKey = secret[0].JWTSecret;

    console.log(req.body);
    const JasonWebToken = await JWT.getJWT(req.body, secretKey);
    console.log("JWT Returned by the function: " + JasonWebToken);
    const decoded = await JWT.decodeJWT(JasonWebToken);
    console.log("decoded token: " + decoded);
    console.log(req.body);
    const validated = await JWT.verifyJWT(JasonWebToken, secretKey);
    console.log(validated);
    res.send(JasonWebToken);

});

//returns true if valid JWT
app.post('/verifyJWT', async(req, res) => {
    //set Secret
    const secret = await Secrets.find()
        .catch((err) => console.log(err));

    const secretKey = secret[0].JWTSecret;

    const jwtToVerify = req.body.Token;
    console.log("JWT to verify: " + jwtToVerify);
    const validated = await JWT.verifyJWT(jwtToVerify, secretKey);
    console.log(validated);
    res.send(req.body); 
});


app.listen(3001, function() {
    console.log("Server is running");
});