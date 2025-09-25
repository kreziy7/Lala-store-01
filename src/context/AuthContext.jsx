import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаём контекст
const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Провайдер для управления авторизацией
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка пользователя из localStorage при монтировании
  useEffect(() => {
    const storedUser = localStorage.getItem('lalastore_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Проверка срока действия токена или сессии (пример: 1 час)
      if (parsedUser.expires && new Date(parsedUser.expires) < new Date()) {
        logout();
      } else {
        setUser(parsedUser);
      }
    }
    setIsLoading(false);
  }, []);

  // Функция логина
  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('lalastore_users') || '[]');
      const foundUser = users.find((u) => u.email === email && u.password === password); // Замените на хеш проверку

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const updatedUser = {
          ...userWithoutPassword,
          expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Сессия на 1 час
        };
        setUser(updatedUser);
        localStorage.setItem('lalastore_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Функция регистрации
  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('lalastore_users') || '[]');
      const existingUser = users.find((u) => u.email === userData.email);

      if (existingUser) {
        return false;
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        role: 'user', // По умолчанию роль "user", можно изменить на "admin" при регистрации
      };

      users.push(newUser);
      localStorage.setItem('lalastore_users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      const updatedUser = {
        ...userWithoutPassword,
        expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem('lalastore_user', JSON.stringify(updatedUser));

      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('lalastore_user');
  };

  // Функция обновления пользователя (например, для изменения данных)
  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData, expires: new Date(Date.now() + 60 * 60 * 1000).toISOString() };
      setUser(updatedUser);
      localStorage.setItem('lalastore_user', JSON.stringify(updatedUser));
    }
  };

  // Значение контекста
  const value = {
    user,
    login,
    register,
    logout,
    updateUser, // Новый метод для обновления данных пользователя
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};