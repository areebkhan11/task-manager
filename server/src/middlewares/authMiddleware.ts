import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Define the interface for AuthRequest where user is optional
interface AuthRequest extends Request {
  user?: IUser;
}

// Middleware to protect routes
const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as jwt.JwtPayload; // Explicitly provide an empty string for JWT_SECRET if undefined

      // Ensure user is populated with the correct user data from the database
      req.user = await User.findById(decoded.id).select("-password");

      // If the user exists, continue the request cycle
      if (req.user) {
        next();
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is found, respond with unauthorized error
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
