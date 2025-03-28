"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ onClose, setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!isLogin) {
            if (!form.name.trim()) newErrors.name = "Введите имя";
            if (!form.surname.trim()) newErrors.surname = "Введите фамилию";
            if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Пароли не совпадают";
        }
        if (!form.email.trim()) {
            newErrors.email = "Введите email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Некорректный email";
        }
        if (!form.password.trim()) newErrors.password = "Введите пароль";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        const url = isLogin
            ? "https://green-shop-backend.onrender.com/api/user/sign-in?access_token=64bebc1e2c6d3f056a8c85b7"
            : "https://green-shop-backend.onrender.com/api/user/sign-up?access_token=64bebc1e2c6d3f056a8c85b7";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    isLogin
                        ? { email: form.email, password: form.password }
                        : { name: form.name, surname: form.surname, email: form.email, password: form.password }
                ),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = data.user || { name: form.name, surname: form.surname, email: form.email };
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                onClose();
            } else {
                setErrors({ form: data.message || "Ошибка при обработке запроса" });
            }
        } catch (error) {
            setErrors({ form: "Ошибка соединения с сервером" });
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex justify-center items-center bg-opacity-30 backdrop-blur-sm z-1000"
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">✖</button>
                    <h2 className="text-lg font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
                    {errors.form && <p className="text-red-500 mb-2">{errors.form}</p>}

                    {!isLogin && (
                        <>
                            <input type="text" name="name" placeholder="Имя" className="w-full p-2 mb-2 border" onChange={handleInputChange} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            <input type="text" name="surname" placeholder="Фамилия" className="w-full p-2 mb-2 border" onChange={handleInputChange} />
                            {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
                        </>
                    )}

                    <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-2 border" onChange={handleInputChange} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    <input type="password" name="password" placeholder="Пароль" className="w-full p-2 mb-2 border" onChange={handleInputChange} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    {!isLogin && (
                        <>
                            <input type="password" name="confirmPassword" placeholder="Повторите пароль" className="w-full p-2 mb-4 border" onChange={handleInputChange} />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </>
                    )}

                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded w-full">
                        {isLogin ? "Login" : "Register"}
                    </button>
                    <p className="mt-4 text-center">
                        {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"} 
                        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
                            {isLogin ? "Зарегистрируйтесь" : "Войти"}
                        </button>
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
