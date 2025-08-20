import express from "express";
import z from "zod";
import { prismaClient } from "./__mock__/db";
export const app = express();
app.use(express.json());

const signupSchema = z.object({
  name: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const parseSchema = signupSchema.safeParse(req.body);
  if (!parseSchema.success) {
    res.status(400).json({ message: "Invalid Request" });
    return;
  }
  await prismaClient.user.create({
    data: {
      name: parseSchema.data.name,
      password: parseSchema.data.password,
    },
  });
  res.status(200).json({
    message: `User ${parseSchema.data?.name} signed up successfully!`,
  });
});
app.post("/login", async (req, res) => {
  const parseSchema = signupSchema.safeParse(req.body);
  if (!parseSchema.success) {
    res.status(400).json({ message: parseSchema.error.issues[0].message });
    return;
  }
  await prismaClient.user.create({
    data: {
      name: parseSchema.data.name,
      password: parseSchema.data.password,
    },
  });
  res.status(200).json({
    message: `User ${parseSchema.data?.name} logged in successfully!`,
  });
});
