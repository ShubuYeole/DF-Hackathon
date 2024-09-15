import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { resetPassword, user, checkAuth } = useUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                await checkAuth();
                if (user && user.email) {
                    setEmail(user.email);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError("Failed to fetch user information.");
            }
        };
        getUser();
    }, [checkAuth, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await resetPassword(email, password);
            setSuccess(true);
            setError("");
            setTimeout(() => {
                navigate("/"); // Redirect after success
            }, 3000);
        } catch (err) {
            console.error("Password reset failed:", err);
            setError("Failed to reset password. Try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                            disabled
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out w-full"
                    >
                        Reset Password
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
