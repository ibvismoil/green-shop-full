"use client";

import { useState } from "react";

export default function Modal({ onClose, setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!isLogin && form.password !== form.confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }

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
                        : { 
                            name: form.name, 
                            surname: form.surname, 
                            email: form.email, 
                            password: form.password 
                        }
                ),
            });

            const data = await response.json();

            if (response.ok) {
                // Если сервер вернул пользователя, сохраняем его
                const userData = data.user || {
                    name: form.name,
                    surname: form.surname,
                    email: form.email,
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                onClose(); // Закрываем модалку после входа/регистрации
            } else {
                setError(data.message || "Ошибка при обработке запроса");
            }
        } catch (error) {
            setError("Ошибка соединения с сервером");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">✖</button>
                <h2 className="text-lg font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                {/* Форма регистрации */}
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Имя"
                            className="w-full p-2 mb-2 border"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Фамилия"
                            className="w-full p-2 mb-2 border"
                            onChange={handleInputChange}
                        />
                    </>
                )}

                {/* Email & Пароль */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-2 border"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="w-full p-2 mb-2 border"
                    onChange={handleInputChange}
                />
                {!isLogin && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Повторите пароль"
                        className="w-full p-2 mb-4 border"
                        onChange={handleInputChange}
                    />
                )}

                {/* Кнопка входа/регистрации */}
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                    {isLogin ? "Login" : "Register"}
                </button>

                {/* Переключение между Входом и Регистрацией */}
                <p className="mt-4 text-center">
                    {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
                        {isLogin ? "Зарегистрируйтесь" : "Войти"}
                    </button>
                </p>
            </div>
        </div>
    );
}
