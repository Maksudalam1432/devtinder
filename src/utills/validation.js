const validator = require("validator");

const validatorsingupdata = (req) => {
    const { firstName, LastName, email, password } = req.body;

    if (!firstName || !LastName) {
        throw new Error("Name is not valid");
    }

    if ( !validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }

    if ( !validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
};

module.exports={
    validatorsingupdata,
}