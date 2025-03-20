import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be atleast 6 characters long" })
        }

        if (username.length < 2) {
            return res.status(400).json({ message: "Username should be atleast 2 characters long" })
        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }

        // get random avatar
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

        const newUser = new User({ username, email, password, profileImage })
        await newUser.save()

        if (!newUser) return res.status(400).json({ message: "Failed to create user" })

        const token = generateToken(newUser._id)


        res.cookie("token", token)


        return res.status(200).json({
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage
            }
        })
    } catch (error) {
        console.log("Error in register route", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    res.send("Login route");
}