import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

const authService = {
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
        return response.data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
        return response.data;
    }
};

export default authService;