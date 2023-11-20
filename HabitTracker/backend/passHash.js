const bcrypt = require('bcrypt');

const saltRounds = 10;

var password = 'temppasswordexample';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash){

    });
});