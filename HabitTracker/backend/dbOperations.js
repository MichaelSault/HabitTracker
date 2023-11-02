const mongoose = require('mongoose');

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


//DB OPERATIONS
const loginUser = async(userCredentials) => {
    console.log("user logged in");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.find({username: userCredentials.username, password: userCredentials.password})
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser[0]);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}

const signUpUser = async(userCredentials) => {
    console.log("user signed up");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.create({
            username: userCredentials.username,
            email: userCredentials.email,
            password: userCredentials.password,
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
    console.log("user signed up");

    try {
        console.log(habitDetails);
        let returnedHabit = await Habits.create({
            habitTitle: habitDetails.habitTitle
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedHabit[0]);

        return returnedHabit;
    }
    catch(error) {
        console.log(error);
    }
}




module.exports = {
    loginUser,
    signUpUser,
    createHabit
}