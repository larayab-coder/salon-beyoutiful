import { authAPI } from './api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  register: async (name, email, phone, password, passwordConfirm) => {
    try {
      const response = await authAPI.register({
        name,
        email,
        phone,
        password,
        passwordConfirm,
      });
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};
