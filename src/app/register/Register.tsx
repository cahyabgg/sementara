"use client"
import Link from "next/link"
import { useState } from "react"


export default function RegisterPage() {
    const [registerData, setRegisterData] = useState({
        username: "",
        password1: "",
        password2: "",
        email: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("Registration successful:", result.status);
                alert(result.message);
            } else {
                console.error("Registration failed:", result.status);
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRegisterData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            value={registerData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your username"
                            value={registerData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password1"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            value={registerData.password1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Konfirmasi Password</label>
                        <input
                            type="password"
                            name="password2"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            value={registerData.password2}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
