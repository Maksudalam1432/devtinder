const jwt = require("jsonwebtoken");
const user1 = require("../model/user");

const useauth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not valid");
        }

        const decoded = jwt.verify(token, "maksud@122#789"); 
        const { _id } = decoded;

        const user = await user1.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; 
        next();

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    useauth,
};
