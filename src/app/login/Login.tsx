"use client"
import Link from "next/link"
import { useState } from "react"
import { loginUser } from "./_api/route";


export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
    
        const response = await loginUser(loginData);
    
        setLoading(false);
    
        if (response.success) {
          alert("Login successful: " + response.message);
        } else {
          alert("Login failed: " + response.message);
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your username"
                            value={loginData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-500 text-center mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
