import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

export function signJWTToken(payload: any) {
    return jwt.sign(payload, SECRET_KEY!, { expiresIn: "7d" });
}

export function verifyJWTToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY!);
    } catch {
        return null;
    }
}