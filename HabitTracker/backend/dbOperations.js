const loginUser = async(userCredentials) => {
    console.log("user logged in");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.find({username: req.query.username, password: req.query.password})
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
            username: req.body.email,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser[0]);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}


const createHabit = async(habitDetails) => {
    console.log("user signed up");

    try {
        console.log(userCredentials);
        let returnedHabit = await Habits.create({
            habitTitle: req.body.habitTitle
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser[0]);

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