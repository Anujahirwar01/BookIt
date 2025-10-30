import jwt from 'jsonwebtoken';

function getJwtSecret() {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set. Please set JWT_SECRET in your .env or environment.');
    }
    return JWT_SECRET;
}

export default function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Token error' });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Malformed token' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
