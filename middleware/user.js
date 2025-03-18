const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    try {
        const token = req.headers.authtoken;

        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" });
        }

        const decoded = jwt.verify(token, JWT_PASSWORD);

        if (!decoded || !decoded.userId) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Authentication failed", error: err.message });
    }
}

module.exports = { userMiddleware };
