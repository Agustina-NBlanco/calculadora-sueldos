import { ENV } from "../config/env"
import { JwtPayload } from "../types/jwtpayload"
import jwt from "jsonwebtoken"

export const generateAcessToken = (payload: Pick<JwtPayload, 'id' | 'email'>) => {
    return jwt.sign(payload, ENV.JWT_SECRET, {
        expiresIn: "1h"
    })
}
export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload
}