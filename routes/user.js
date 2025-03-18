const { Router } = require("express");
const { userModel } = require("../db/user");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.put("/:id", userMiddleware, async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json({ error: "Error hashing password", details: err.message });
            }
        }
        try {
            const user = await userModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
  
            res.status(200).json({ message: "Account updated successfully", user });
        } catch (err) {
            return res.status(500).json({ error: "Error updating user", details: err.message });
        }
    } else {
        return res.status(403).json({ error: "You can update only your account" });
    }
  });

module.exports = {
    userRouter:userRouter
};