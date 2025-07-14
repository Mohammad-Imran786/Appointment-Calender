import React, { useState } from "react";

const Login = ({ onLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Both email and password are required');
            return;
        }

        if (email === "staff@clinic.com" && password === "123456") {
            setError('');
            onLogin();
        } else {
            setError("Invalid email or password.");
        }

    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute min-w-screen h-full bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-60" />
            <form
                onSubmit={handleSubmit}
                className="relative bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">

                <h2 className="text-2xl font-bold text-center">Clinic <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-pink-500 via-blue-600 via-purple-500 to-pink-400 inline-block animate-rainbow bg-[size:200%_auto]">Login</span></h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md"
                        value={email}
                        required
                        onChange={handleInputChange(setEmail)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md"
                        value={password}
                        required
                        onChange={handleInputChange(setPassword)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md cursor-pointer"
                >
                    Sign In
                </button>

                <div className="mt-4 text-gray-600 text-sm">
                    <p className="font-semibold mb-2">🧪 Mock Credentials:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Email: <span className="font-mono">staff@clinic.com</span></li>
                        <li>Password: <span className="font-mono">123456</span></li>
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default Login;
