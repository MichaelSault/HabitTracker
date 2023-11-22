const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (userPassword) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        return bcrypt.hash(userPassword, salt, function(err, hash){
            console.log()
        });
    });
}

const validatePassword = (userPassword, hash) => {
    bcrypt.compare(userPassword, hash)
        .then(res => {
            console.log(res);
            return res
        })
        .catch(err => console.error(err.message));
}

module.exports = {
    hashPassword,
    validatePassword
}