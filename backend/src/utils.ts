import jwt from "jsonwebtoken";
import { User } from "./models/userModel";
import { NextFunction, Request, Response } from "express";
export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "nunagidshezeloimza",
    { expiresIn: "30d" }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "nunagidshezeloimza"
    );
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).json({ message: "No Token" });
  }
};
