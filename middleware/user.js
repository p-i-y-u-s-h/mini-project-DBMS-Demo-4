const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");
const { userModel } = require("../db/user");

async function userMiddleware(req, res, next) {
    try {
        const token = req.headers.authtoken;
        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" });
        }

        const decoded = jwt.verify(token, JWT_PASSWORD);
        if (!decoded || !decoded.id) {
            return res.status(403).json({ message: "Invalid token" });
        }

        const paramid = req.params.id;
        const user = await userModel.findById(paramid);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (decoded.id !== user.id.toString()) {
            return res.status(403).json({ message: "Invalid user" });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Authentication failed", error: err.message });
    }
}

module.exports = { userMiddleware };
