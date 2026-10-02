import { ENV } from "../config/env"
import jwt from "jsonwebtoken"
import { JwtPayload } from "../types/jwtPayload"


export const generateAcessToken = (payload: Pick<JwtPayload, 'id' | 'email'>) => {
    return jwt.sign(payload, ENV.JWT_SECRET, {
        expiresIn: "1h"
    })
}
export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload
}