import jwt from 'jsonwebtoken';


const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({ message: "Unauthorized user", success: false }); 
    }

    try {
        const payload = jwt.verify(token, 'JWT_SECRET');
        req.userID = payload.userID;
        req.email = payload.email;
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }

    next();
}

export default jwtAuth;