import { UnAuthenticatedError } from "../errors/errors.js";
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const headers = req.headers;
    const authHeader = req.headers.authorization;

    if (!authHeader||!authHeader.startsWith("Bearer")) {
        throw new UnAuthenticatedError("You are not authorized to do that!")
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try {
        const payload = jwt.verify(token, process.env.jwt_secret);

        console.log(payload);

        req.user = payload.id;
    } catch (error) {
        throw new UnAuthenticatedError("You are not authorized to do that!");
    }

    next()
}

export default protect