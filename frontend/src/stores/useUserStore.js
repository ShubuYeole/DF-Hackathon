import { toast } from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", { name, email, password });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    login: async (email, password) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });

            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },


    resetPassword: async (email, password) => {
        try {
            await axios.post("/auth/resetpassword", { email, password });
            toast.success("Password reset Successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during password reset");
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            console.log(error.message);
            set({ checkingAuth: false, user: null });
        }
    },

    refreshToken: async () => {
        // Prevent multiple simultaneous refresh attempts
        if (get().checkingAuth) return;

        set({ checkingAuth: true });
        try {
            const response = await axios.post("/auth/refresh-token");
            set({ checkingAuth: false });
            return response.data;
        } catch (error) {
            set({ user: null, checkingAuth: false });
            throw error;
        }
    },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('Error occurred:', error);
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log('Refreshing token...');
                // If a refresh is already in progress, wait for it to complete
                if (refreshPromise) {
                    await refreshPromise;
                    return axios(originalRequest);
                }

                // Start a new refresh process
                refreshPromise = useUserStore.getState().refreshToken();
                await refreshPromise;
                refreshPromise = null;
                console.log('Token refreshed successfully');

                return axios(originalRequest);
            } catch (refreshError) {
                console.log('Error refreshing token:', refreshError);
                // If refresh fails, redirect to login or handle as needed
                useUserStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);