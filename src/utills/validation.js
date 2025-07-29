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

const validatoresedit = (req) => {
  const alloweditfield = [
    "firstName",
    "lastName",
    "email",
    "password",
    "photourl",
    "about",
    "skills",
  ];

  return Object.keys(req.body).every((field) =>
    alloweditfield.includes(field)
  );
};

module.exports={
    validatorsingupdata,
    validatoresedit,
}