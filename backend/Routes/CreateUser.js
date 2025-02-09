import express from "express";
import { Router } from "express";
import User from "../Models/User.js";
import { userSchema } from "../zod.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { z } from "zod";

const router = Router();

router.post("/createuser", async (req, res) => {
  try {
    // const validateData = userSchema.parse(req.body);
    // await User.create(validateData);

    const { name, password, location, email } = userSchema.parse(req.body);

    // const hashvalue = crypto
    //   .createHash("sha256")
    //   .update(password)
    //   .digest("hex");

    const hashvalue = await bcrypt.hash(password, 10);

    await User.create({
      name: name,
      password: hashvalue,
      location: location,
      email: email,
    });

    res.json({ success: true });
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
