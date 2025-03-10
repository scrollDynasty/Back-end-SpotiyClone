# 🎵 Back-end-SpotiyClone

<div align="center">
  
  <img src="/logo/Clone.png" alt="SpotifyClone Logo" width="250" height="250">
  
  [![GitHub last commit](https://img.shields.io/github/last-commit/DKhorov/Back-end-SpotiyClone?style=flat-square)](https://github.com/DKhorov/Back-end-SpotiyClone/commits/main)
  [![GitHub repo size](https://img.shields.io/github/repo-size/DKhorov/Back-end-SpotiyClone?style=flat-square)](https://github.com/DKhorov/Back-end-SpotiyClone)
  [![GitHub issues](https://img.shields.io/github/issues/DKhorov/Back-end-SpotiyClone?style=flat-square)](https://github.com/DKhorov/Back-end-SpotiyClone/issues)
  [![SpotifyClone pet Community Project](https://img.shields.io/badge/SpotifyClone-pet-blue?style=flat-square)](https://github.com/DKhorov/Back-end-SpotiyClone)
  [![Version](https://img.shields.io/badge/Version-4.3-red?style=flat-square)](https://github.com/DKhorov/Back-end-SpotiyClone)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
  
  **Современный бэкенд для музыкального стриминг-сервиса**
</div>

## 📑 Содержание

<div align="center">
  
| 📚 Раздел | 📝 Описание |
|---------|------------|
| [🆕 Что нового](#-что-нового-в-обновлении) | Информация о последних обновлениях |
| [🛠️ Технологии](#-технологии-и-библиотеки) | Используемые технологии и библиотеки |
| [📘 API Документация](#-api-документация) | Описание API и как его использовать |
| [🔑 Восстановление пароля](#-восстановление-пароля) | Функционал восстановления пароля |
| [🛡️ Защита от API-атак](#-защита-от-api-атак) | Реализованные меры безопасности |
| [🏗️ Архитектура](#-архитектура) | Структура и компоненты проекта |
| [👨‍💻 Для разработчиков](#-для-разработчиков-back-end-темы) | Информация для контрибьюторов |
| [📄 Лицензия](#-лицензия) | Информация о лицензии |

</div>

---

## 🆕 Что нового в обновлении

<div align="center">
  <h3>🚀 Новые функции и улучшения</h3>
</div>

<details>
<summary>🚀 Версия 4.3</summary>

- **✨ PostgreSQL Support
</details>

<details>
<summary>🚀 Версия 4.2</summary>

- **✨ Улучшенное восстановление пароля**: Реализована двухфакторная аутентификация при сбросе пароля (токен + код подтверждения)
- **📧 Отправка электронных писем**: Добавлена интеграция с Nodemailer для отправки красивых HTML-писем
- **💾 Постоянное хранение данных**: Данные теперь сохраняются в файле SQLite вместо хранения в памяти
- **🔒 Улучшенная безопасность**: Защита от утечки токенов в электронных письмах и проверка кода подтверждения
</details>

<details>
<summary>🔄 Версия 4.1</summary>

- **🔑 Восстановление пароля**: Добавлен полный функционал восстановления пароля с токенами и ограничением по времени
- **📚 Swagger документация**: Добавлена интерактивная документация API с помощью Swagger UI
- **🛠️ Улучшенная обработка ошибок**: Улучшена обработка ошибок при восстановлении пароля и других операциях
</details>

<details>
<summary>🏗️ Версия 4.0</summary>

- **🏭 DB Factory**: Создана фабрика (config/dbFactory.js), которая выбирает между SQLite (для разработки) и MongoDB (для продакшена) на основе NODE_ENV
- **🔧 User Service**: Добавлен сервис (services/userService.js) для инкапсуляции бизнес-логики работы с пользователями (CRUD-операции)
- **🎮 Контроллеры**: Обновлены контроллеры, чтобы использовать UserService вместо прямых вызовов репозиториев
- **📦 Реализован BaseService** с общими CRUD-операциями
- **👤 Сервис UserService** теперь наследуется от BaseService для переиспользования базовой логики
</details>

---

## 🛠️ Технологии и библиотеки

<div align="center">
  
| Категория | Технологии |
|-----------|------------|
| **🖥️ Фреймворк** | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |
| **🗄️ База данных** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) |
| **🔐 Аутентификация** | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) |
| **📚 Документация** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black) |
| **🧩 Безопасность** | ![Bcrypt](https://img.shields.io/badge/Bcrypt-003B57?style=for-the-badge&logo=npm&logoColor=white) ![Helmet](https://img.shields.io/badge/Helmet-000000?style=for-the-badge&logo=npm&logoColor=white) |
| **📧 Коммуникация** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white) |
| **🧪 Разработка** | ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) ![Winston](https://img.shields.io/badge/Winston-231F20?style=for-the-badge&logo=npm&logoColor=white) |

</div>

<details>
<summary>📦 Дополнительные библиотеки</summary>

- **🔒 Bcrypt**: Библиотека для хеширования паролей, обеспечивающая безопасное хранение данных
- **📁 Multer**: Middleware для обработки загрузки файлов на сервер
- **🛡️ Helmet**: Набор middleware для защиты Express-приложения путем установки HTTP-заголовков безопасности
- **🧹 XSS-Clean**: Библиотека для защиты от XSS-атак путем очистки пользовательского ввода
- **⏱️ Express Rate Limit**: Middleware для ограничения количества запросов от одного IP-адреса
- **🔄 Nodemon**: Утилита для автоматического перезапуска сервера при изменении файлов
- **📧 Nodemailer**: Библиотека для отправки электронных писем из Node.js приложений
- **📝 Winston**: Библиотека для логирования (удобна для отслеживания ошибок и событий)
- **✅ Validator.js**: Библиотека для валидации и санитизации данных
</details>

---

## 📘 API Документация

<div align="center">
  <h3>📚 Интерактивная документация API</h3>
  
  *Доступна по адресу `http://localhost:4000/api-docs`*
</div>

### 🚀 Как использовать Swagger UI

<details>
<summary>1️⃣ Запустите сервер</summary>

```bash
node index.js
```
</details>

<details>
<summary>2️⃣ Откройте документацию</summary>

Откройте браузер и перейдите по адресу `http://localhost:4000/api-docs`
</details>

<details>
<summary>3️⃣ Исследуйте API</summary>

В Swagger UI вы увидите все доступные эндпоинты, сгруппированные по тегам:
- 🔑 Аутентификация (регистрация, вход, восстановление пароля)
- 👤 Пользователи (информация о пользователе)
- 🎵 Аудио (загрузка и получение аудиофайлов)
</details>

<details>
<summary>4️⃣ Тестирование эндпоинтов</summary>

- Нажмите на нужный эндпоинт
- Нажмите кнопку "Try it out"
- Заполните необходимые параметры
- Нажмите "Execute"
- Получите результат запроса
</details>

---

## 🔑 Восстановление пароля

<div align="center">
  <h3>🔐 Двухфакторная аутентификация при сбросе пароля</h3>
</div>

### 🔄 Процесс восстановления пароля

<details>
<summary>1️⃣ Запрос на восстановление пароля</summary>

- Пользователь отправляет запрос на `/auth/forgot-password` с указанием email
- Сервер генерирует уникальный токен и код подтверждения
- Сервер отправляет email с ссылкой (содержащей токен) и кодом подтверждения
</details>

<details>
<summary>2️⃣ Двухфакторная аутентификация</summary>

- Пользователь переходит по ссылке из письма (первый фактор - токен в URL)
- Пользователь вводит код подтверждения из письма (второй фактор)
- Система проверяет оба фактора для подтверждения личности пользователя
</details>

<details>
<summary>3️⃣ Сброс пароля</summary>

- После успешной проверки токена и кода, пользователь вводит новый пароль
- Сервер обновляет пароль пользователя в базе данных
- Токен и код становятся недействительными после использования
</details>

### ⚙️ Настройка отправки электронных писем

<details>
<summary>📧 Конфигурация SMTP</summary>

Для настройки отправки электронных писем необходимо указать параметры SMTP-сервера в файле `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@spotifyclone.com
FRONTEND_URL=http://localhost:3000
```

Для Gmail необходимо использовать пароль приложения, который можно получить в настройках безопасности Google-аккаунта.
</details>

### 🔍 Особенности реализации

<div align="center">
  
| 🔒 Функция | Описание |
|-----------|----------|
| **Двухфакторная аутентификация** | Для сброса пароля требуется и токен (в URL), и код подтверждения (из письма) |
| **Безопасные токены** | Токены генерируются с помощью `crypto.randomBytes()` для обеспечения уникальности |
| **Ограниченный срок действия** | Токены и коды действительны только 1 час |
| **Одноразовое использование** | Токены и коды становятся недействительными после использования |
| **Красивые HTML-письма** | Письма имеют современный дизайн с четкими инструкциями |
| **Постоянное хранение данных** | Данные сохраняются в файле SQLite, что обеспечивает их сохранность между перезапусками сервера |
| **Защита от перебора** | Реализовано ограничение скорости запросов (rate limiting) |

</div>

---

## 🛡️ Защита от API-атак

<div align="center">
  <h3>🛡️ Многоуровневая защита API</h3>
</div>

### 🔒 Реализованные меры безопасности

<details>
<summary>🛡️ Helmet</summary>

**Что это**: Middleware для Express.js, который помогает защитить приложение, устанавливая различные HTTP-заголовки безопасности.

```javascript
app.use(helmet());
```

**Что защищает**:
- Устанавливает заголовки, такие как `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security` и другие
- Предотвращает атаки: Clickjacking, MIME-sniffing, XSS
</details>

<details>
<summary>🧹 XSS-Clean</summary>

**Что это**: Middleware для защиты от XSS-атак (межсайтовый скриптинг).

```javascript
app.use(xss());
```

**Что защищает**:
- Очищает пользовательский ввод от потенциально опасных HTML и JavaScript-кодов
- Предотвращает внедрение вредоносных скриптов через пользовательские данные
</details>

<details>
<summary>⏱️ Rate Limiting</summary>

**Что это**: Middleware для ограничения количества запросов от одного IP-адреса.

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничение на 100 запросов за окно windowMs для каждого IP
});
app.use(limiter);
```

**Что защищает**:
- Предотвращает DoS-атаки и Brute Force-атаки
- Ограничивает количество запросов, которые может сделать злоумышленник
</details>

<details>
<summary>🌐 CORS</summary>

**Что это**: Middleware для управления кросс-доменными запросами.

```javascript
app.use(cors());
```

**Что защищает**:
- Позволяет контролировать, какие домены могут обращаться к вашему API
- Предотвращает CSRF-атаки и несанкционированный доступ к API с других доменов
</details>

<details>
<summary>🍪 Cookie Parser</summary>

**Что это**: Middleware для работы с cookies.

```javascript
app.use(cookieParser());
```

**Что защищает**:
- Позволяет безопасно работать с cookies, которые могут использоваться для хранения токенов аутентификации
- Предотвращает атаки, связанные с подделкой cookies
</details>

<details>
<summary>📁 Multer</summary>

**Что это**: Middleware для обработки загрузки файлов.

```javascript
const upload = multer({ storage: storage, fileFilter });
```

**Что защищает**:
- Проверяет тип загружаемых файлов с помощью `fileFilter`
- Ограничивает загрузку только допустимыми типами файлов
</details>

---

## 🏗️ Архитектура

<div align="center">
  <h3>🏗️ Многослойная архитектура проекта</h3>
</div>

### 🧩 Основные компоненты

<details>
<summary>🏭 Фабрика баз данных (DBFactory)</summary>

**Назначение**: DBFactory — это класс, который отвечает за выбор и инициализацию репозитория в зависимости от окружения (NODE_ENV). Он позволяет легко переключаться между SQLite и MongoDB без изменения кода приложения.

```javascript
// Пример использования DBFactory
const userRepository = DBFactory.getRepository("user");
```
</details>

<details>
<summary>📦 Репозитории</summary>

**BaseRepository**
- Абстрактный класс, определяющий интерфейс для всех репозиториев
- Задаёт стандартные CRUD-методы, которые должны быть реализованы в конкретных репозиториях

**SQLiteUserRepository**
- Реализует доступ к данным пользователей в SQLite для режима разработки

**MongoUserRepository**
- Реализует доступ к данным пользователей в MongoDB для продакшен-режима
</details>

<details>
<summary>🔧 Сервисы</summary>

**BaseService**
- Абстрактный класс, предоставляющий стандартные CRUD-операции для всех сущностей
- Инкапсулирует бизнес-логику и работает с любым репозиторием

**UserService**
- Наследуется от BaseService и добавляет специфичную для пользователей логику (например, валидацию)

**Расширение**
Для добавления новой сущности (например, post):
1. Создайте SQLitePostRepository и MongoPostRepository
2. Добавьте их в DBFactory.getRepository
3. Создайте PostService, наследующий BaseService
</details>

<details>
<summary>🎮 Контроллеры</summary>

Контроллеры обрабатывают HTTP-запросы, вызывают соответствующие сервисы и формируют ответы.
</details>

<details>
<summary>🔌 Middleware</summary>

Middleware обеспечивают дополнительную функциональность, такую как аутентификация, валидация и защита от атак.
</details>

---

## 👨‍💻 Для разработчиков (Back-end темы)

<div align="center">
  <h3>🤝 Присоединяйтесь к разработке</h3>
</div>

> **⚠️ Внимание**: Изменение роли по email временно доступно для тестирования. В будущем эта функциональность может быть изменена или удалена.

Этот проект открыт для всех, кто хочет помочь в разработке клона Spotify! Мы приветствуем любые идеи, улучшения и исправления.

### 🤝 Как внести свой вклад

<div align="center">
  
| Шаг | Описание |
|-----|----------|
| **🎯 Выберите задачу** | Посмотрите список TODO чата и выберите задачу, которую хотите выполнить |
| **🛠️ Создайте ветку** | Создайте новую ветку для ваших изменений |
| **💻 Работайте над кодом** | Внесите изменения и улучшения |
| **📤 Создайте Pull Request** | Отправьте Pull Request с описанием ваших изменений |

</div>

Мы рады каждому контрибьютору! 🚀

---

<div align="center">
  
  ## 📄 Лицензия
  
  Этот проект распространяется под лицензией MIT. Подробности смотрите в файле [LICENSE](LICENSE).
  
  ---
  
  <img src="https://i.imgur.com/YourLogo.png" alt="SpotifyClone Logo" width="150">
  
  **Made with ❤️ by SpotifyClone Pet Community**
  
  [GitHub](https://github.com/DKhorov/Back-end-SpotiyClone) • [Documentation](http://localhost:4000/api-docs) • [Issues](https://github.com/DKhorov/Back-end-SpotiyClone/issues)
  
</div>
