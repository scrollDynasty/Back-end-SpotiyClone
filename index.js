console.log("Spotify Clone Back-end");

// Импорт необходимых модулей
import 'dotenv/config'; // Импорт dotenv для работы с переменными окружения
import cors from 'cors'; // Модуль для обработки CORS (Cross-Origin Resource Sharing)
import multer from 'multer'; // Модуль для обработки загрузки файлов
import express from 'express'; // Фреймворк для создания сервера
import mongoose from 'mongoose'; // Модуль для работы с MongoDB
import bcrypt from 'bcrypt'; // Модуль для хеширования паролей
import {registerValidator} from './validations/auth.js'; // Валидатор для регистрации
import {loginValidation} from './validations/auth.js'; // Валидатор для входа
import {validationResult} from 'express-validator'; // Модуль для обработки результатов валидации
import UserModel from './models/user.js'; // Модель пользователя
import * as UserController from './control/control.js'; // Импорт контроллеров пользователя
import checkAuth from './utils/checkAuth.js'; // Мидлвар для проверки авторизации
import setupSwagger from './swagger.js'; // Импорт настройки Swagger

// Подключение к MongoDB с использованием mongoose
mongoose
 .connect(process.env.MONGODB_URI)
 .then(()=>{console.log("Статус базы данных --- OK")}) // Если подключение успешно, выводим сообщение "DataBase --- OK"
 .catch((err)=>{console.log("Статус базы данных --- ERROR" , err)}); // Если произошла ошибка, выводим сообщение "DataBase --- ERROR" и саму ошибку

// Создание экземпляра приложения express
const app = express();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Указываем папку для сохранения файлов
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Сохраняем файл с оригинальным именем
    }
});

// Использование middleware для обработки JSON и CORS
app.use(express.json()); // Позволяет парсить JSON-тела запросов
app.use(cors()); // Включает CORS для всех маршрутов

// Настройка статической папки для загрузок
app.use('/uploads', express.static('uploads'));

// Настройка Swagger
setupSwagger(app);

// Инициализация multer с настройками хранилища
const upload = multer({ storage: storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Загрузка музыкального файла
 *     description: Загружает музыкальный файл на сервер
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               music:
 *                 type: string
 *                 format: binary
 *                 description: Музыкальный файл для загрузки
 *     responses:
 *       200:
 *         description: Файл успешно загружен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL загруженного файла
 *       401:
 *         description: Не авторизован
 *       500:
 *         description: Ошибка сервера
 */
// Маршрут для загрузки файлов
app.post('/upload', checkAuth, upload.single('music'), (req, res) => {
    // Возвращаем URL загруженного файла в ответе
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход пользователя
 *     description: Аутентификация пользователя и получение JWT токена
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя
 *     responses:
 *       200:
 *         description: Успешная аутентификация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID пользователя
 *                 fullName:
 *                   type: string
 *                   description: Полное имя пользователя
 *                 email:
 *                   type: string
 *                   description: Email пользователя
 *                 avatarUrl:
 *                   type: string
 *                   description: URL аватара пользователя
 *                 token:
 *                   type: string
 *                   description: JWT токен для авторизации
 *       400:
 *         description: Ошибка валидации или неверный пароль
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
// Маршрут для входа
app.post('/auth/login', loginValidation, UserController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     description: Создание нового пользователя и получение JWT токена
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - fullName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя
 *               fullName:
 *                 type: string
 *                 description: Полное имя пользователя
 *               avatarUrl:
 *                 type: string
 *                 description: URL аватара пользователя
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID пользователя
 *                 fullName:
 *                   type: string
 *                   description: Полное имя пользователя
 *                 email:
 *                   type: string
 *                   description: Email пользователя
 *                 avatarUrl:
 *                   type: string
 *                   description: URL аватара пользователя
 *                 token:
 *                   type: string
 *                   description: JWT токен для авторизации
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Ошибка сервера
 */
// Маршрут для регистрации
app.post('/auth/register', registerValidator, UserController.register);

// Запуск сервера на порту из переменных окружения или 4000 по умолчанию
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    if (err) {
        return console.log("Статус сервера --- ERROR ", err);
    }
    console.log(`Статус сервера --- OK. Сервер запущен на порту ${PORT}`);
    console.log(`Документация API доступна по адресу: http://localhost:${PORT}/api-docs`);
});