import { Request, Response } from "express";
import { register as registerService, login as loginService } from "./auth.service";


export const register = async (req: Request, res: Response) => {
    const result = await registerService(req.body)
    return res.status(201).json(result)
}

export const login = async (req: Request, res: Response) => {
    const result = await loginService(req.body)
    return res.status(200).json(result)
}