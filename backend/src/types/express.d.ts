import { JwtPayload } from "./jwtpayload";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}
