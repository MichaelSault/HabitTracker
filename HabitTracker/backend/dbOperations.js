const loginUser = async(userCredentials) => {
    console.log(userCredentials);

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