const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserSection } = require("../models");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  const CreateAccount = async (req, res) => {
    console.log("Create Account API Called");

    upload.single("profileImage")(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "File upload failed" });
        }

        const { email, password } = req.body;
        let profileImage = null;

        try {
            console.log(email, password);

            if (req.file) {
                profileImage = `uploads/${req.file.filename}`;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserSection.create({ email, password: hashedPassword, profileImage });

            res.status(201).json({ message: "User registered successfully", success:true, user });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Registration failed" });
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
        const user = await UserSection.findOne({ where: { email } });
        if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY
      );
  
  
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          profileImage: user.profileImage,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed" });
    }
  };
    

  const getUserInfo=async(req,res)=>{
    console.log('INFO -> USER INFO API CALLED')
    try {
      let { email, } = req.userData;
      console.log(email, 'email, id')
      let user = await UserSection.findOne({
        where: {email}
      });
  
      user = JSON.parse(JSON.stringify(user))
      if (!user)
        return res.status(401).json({ error: "User not found" });
  
      return res.status(200).json({
        success: true,
        message: "User info fetched successfully!",
        payload: {
          ...user,
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  
    }
  
  }
module.exports = {
    CreateAccount,
    login,
    getUserInfo
}