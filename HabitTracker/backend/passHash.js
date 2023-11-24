const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (userPassword) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userPassword, salt);
    console.log(hash);
    return hash;
}

const validatePassword = (userPassword, hash) => {
    console.log(userPassword, hash);
    const validated = bcrypt.compareSync(userPassword, hash); //returns a bool value
    return validated;
}

module.exports = {
    hashPassword,
    validatePassword
}