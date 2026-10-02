import { NextFunction, Request, Response } from "express";
import { extractTokenFromHeader } from "../utils/auth";
import { AppError } from "../utils/AppError";
import { verifyAccessToken } from "../utils/Jwt";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies?.accessToken ?? extractTokenFromHeader(req)

    if (!token) throw new AppError("Token required", 401)

    try {
        const decoded = verifyAccessToken(token)
        req.user = decoded
        next()
    } catch {
        throw new AppError("Invalid token", 401)
    }
}
