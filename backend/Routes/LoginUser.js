import express from "express";
import { Router } from "express";
import User from "../Models/User.js";
import { loginschema } from "../zod.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config(); 

const jwtSecret = process.env.JWT_SECRET;
const router = Router();

router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = loginschema.parse(req.body);

    const loginuser = await User.findOne({ email });

    if (!loginuser) {
      return res
        .status(400)
        .json({ error: "Email does not match try login with correct email" });
    }

    const passwordCompare = await bcrypt.compare(
      req.body.password,
      loginuser.password
    );
    console.log(passwordCompare);

    if (!passwordCompare) {
      return res.status(400).json({
        error: "password does not match try login with correct password",
      });
    }

    const data = {
      user: {
        id: loginuser.id,
      },
    };

    const authtoken = jwt.sign(data, jwtSecret);

    return res.status(200).json({ success: true, authtoken: authtoken });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation Errors:", error.errors);
      res.status(400).json({ success: false, errors: error.errors });
    } else {
      console.error("server error", error);
      res.status(500).json({ success: false, message: "An error occured" });
    }
  }
});

export default router;
