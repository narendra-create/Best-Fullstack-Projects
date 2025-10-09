import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
    throw new Error("Fatal Error: Secret Key is not defined")
}

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authorized, No token!" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Unauthorized: Session has expired. Please log in again."
            });
        }
        return res.status(401).json({ message: "Not authorized, Token failed" })
    }
}

export default authMiddleware;