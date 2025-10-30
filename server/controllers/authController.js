import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function getJwtSecret() {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set. Please set JWT_SECRET in your .env or environment.');
    }
    return JWT_SECRET;
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'Email already in use' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashed });
        await user.save();

        const token = jwt.sign({ userId: user._id }, getJwtSecret(), { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error('Register error', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, getJwtSecret(), { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ error: 'Server error' });
    }
};
