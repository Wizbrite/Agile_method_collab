import jwt from 'jsonwebtoken';

/**
 * Authentication Middleware
 * Protects routes by verifying JWT tokens
 */
export const authenticateToken = (req, res, next) => {
    // TODO: Implement JWT verification (SB01)
    // 1. Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    // 2. Verify token
    try {
        // TODO: Verify JWT and attach user to request
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

/**
 * Optional Authentication Middleware
 * Allows both authenticated and unauthenticated requests
 */
export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            // const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // req.user = decoded;
        } catch (error) {
            // Token invalid, but continue anyway
        }
    }
    next();
};
