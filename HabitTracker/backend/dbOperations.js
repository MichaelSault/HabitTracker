const mongoose = require('mongoose');
const passHash = require('./passHash');

//DB SCHEMA AND MODEL
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    hashedPassword: String,
    firstName: String,
    lastName: String
});

const habitSchema = mongoose.Schema({
    habitTitle: String,
    habitDescription: String,
    userID: String,
    frequency: Number,
    timePeriod: Number,
    validDays: Array
});

const habitLogSchema = mongoose.Schema({
    habitID: String,
    logDate: Date,
    comment: String
});


const Users = mongoose.model("Users", userSchema);

const Habits = mongoose.model("Habits", habitSchema);

const Logs = mongoose.model("Logs", habitLogSchema);

//DB OPERATIONS
const loginUser = async(userCredentials) => {
    var result;
    console.log("logging in a user...");

    try {
        console.log(userCredentials.username);
        //returns a user with the correct username from the database
        const returnedUser = await Users.find({username: userCredentials.username})
        .then((res) => (result = res[0].hashedPassword))
        .catch((err) => console.log(err));
        
        console.log(result);

        if (passHash.validatePassword(userCredentials.password, result)){
            console.log("User validated");
            return returnedUser;
        } else {
            console.log("Incorrect password");
        }

        console.log("Returned From Query: ", returnedUser);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}

const signUpUser = async(userCredentials) => {
    console.log("signing up a user...");

    try {
        console.log(userCredentials);
        let hashedPassword = passHash.hashPassword(userCredentials.password);
        console.log("hashed password: ", hashedPassword);

        let returnedUser = await Users.create({
            username: userCredentials.username,
            email: userCredentials.email,
            hashedPassword: hashedPassword,
            firstName: userCredentials.firstName,
            lastName: userCredentials.lastName
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}


const createHabit = async(habitDetails) => {
    console.log("creating a habit...");

    try {
        console.log(habitDetails);
        let returnedHabit = await Habits.create({
            habitTitle: habitDetails.habitTitle,
            habitDescription: habitDetails.habitDescription
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedHabit);

        return returnedHabit;
    }
    catch(error) {
        console.log(error);
    }
}

const getHabits = async(userCredentials) => {
    console.log("getting a habit...");

    try {
        console.log(userCredentials);
        let returnedHabits = await Habits.find({username: userCredentials.userID})
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedHabits);

        return returnedHabits;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    loginUser,
    signUpUser,
    createHabit,
    getHabits
}