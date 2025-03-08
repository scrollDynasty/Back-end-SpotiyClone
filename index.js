// -------------------------------
// Backend сервер для Spotify клона
// -------------------------------

// Импортируем необходимые модули
import express from 'express';
// import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import multer from 'multer';

// Импортируем пользовательские модули и middleware
import { registerValidator, loginValidation } from './validations/auth.js';
import { uc } from './control/index.js';
import checkAuth from './utils/checkAuth.js';
import { fileFilter, getAudio } from "./control/AudioService.js";

// -------------------------------
// Подключение к базе данных MongoDB
// -------------------------------
//  Реализовано получение базы данных через фабрику
// -------------------------------
// mongoose.connect('API_KEY', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Подключено к MongoDB');
// }).catch((err) => {
//   console.error('Ошибка подключения к MongoDB:', err);
// });

// -------------------------------
// Инициализация приложения Express
// -------------------------------
const app = express();

// -------------------------------
// Middleware для обеспечения безопасности
// -------------------------------
app.use(helmet()); // Установка заголовков безопасности
app.use(xss()); // Защита от XSS атак
app.use(cookieParser()); // Парсинг cookies

// -------------------------------
// Ограничение скорости запросов
// -------------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничение на 100 запросов за окно windowMs для каждого IP
});
app.use(limiter);

// -------------------------------
// Настройка middleware
// -------------------------------
app.use(express.json()); // Парсинг JSON тел запросов
app.use(cors()); // Включение CORS для всех маршрутов

// -------------------------------
// Конфигурация загрузки файлов
// -------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Указываем папку для сохранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Генерируем уникальное имя файла
  }
});
const upload = multer({ storage: storage, fileFilter }); // Инициализируем multer с настройками хранилища

// -------------------------------
// Статические файлы
// -------------------------------
app.use('/uploads', express.static('uploads')); // Позволяем обслуживать статические файлы из папки uploads

// -------------------------------
// Маршруты
// -------------------------------

// Маршруты аутентификации
app.post('/auth/login', loginValidation, uc.login); // Маршрут для входа
app.post('/auth/register', registerValidator, uc.register); // Маршрут для регистрации
app.post('/auth/update-role', uc.updateUserRole); // Маршрут для обновления роли пользователя
app.get("/user/me", checkAuth, uc.getMe); // Маршрут для получения информации о текущем пользователе

// Маршруты аудио
app.post('/audio/upload', upload.single('music'), (req, res) => {
  res.json({ message: 'Файл успешно загружен' });
}); // Маршрут для загрузки аудиофайла
app.get("/audio/get/:songName", getAudio); // Маршрут для получения данных об аудиофайле

// -------------------------------
// Обработка ошибок
// -------------------------------
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// -------------------------------
// Запуск сервера
// -------------------------------
app.listen(4000, (err) => {
  if (err) {
    return console.error("Ошибка сервера:", err);
  }
  console.log("Сервер запущен на порту 4000");
});