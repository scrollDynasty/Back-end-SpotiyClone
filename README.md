# Back-end-SpotiyClone ( ver4.1)

![GitHub last commit](https://img.shields.io/github/last-commit/DKhorov/Back-end-SpotiyClone?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/DKhorov/Back-end-SpotiyClone?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/DKhorov/Back-end-SpotiyClone?style=flat-square)
![SpotifyClone pet Community Project](https://img.shields.io/badge/SpotifyClone-pet-blue)
![SpotifyClone pet Community Project](https://img.shields.io/badge/Version-4.5-yellow)


---

## Разделы 
- [🆕 Что нового в обновлении](#-что-нового-в-обновлении)
- [📝 API Документация](#-api-документация)
- [🔑 Восстановление пароля](#-восстановление-пароля)
- [🛡️ Подробнее про обновление  ](#-защиты-от-api-атак)
- [👨‍💻 !!!Для разработчиков из темы Back-end!!!!](#-для-разработчиков-back-end-темы)

---
## 🛠 Технологии и библиотеки

### **📦 Фреймворк**
- [Express.js](https://expressjs.com/) — минималистичный и гибкий фреймворк для Node.js, используемый для создания серверов и API.

### **🗄️ База данных**
- [MongoDB](https://www.mongodb.com/) — NoSQL-база данных для хранения документов в формате JSON.
- [Mongoose](https://mongoosejs.com/) — библиотека для работы с MongoDB, предоставляющая удобный API для создания моделей и схем.
- [SQLite](https://www.sqlite.org/) — легковесная встраиваемая реляционная база данных для разработки.

### **🔑 Аутентификация**
- [JWT](https://jwt.io/) — JSON Web Tokens для безопасной аутентификации и авторизации пользователей.

### **📚 Документация**
- [Swagger UI](https://swagger.io/tools/swagger-ui/) — интерактивная документация API.
- [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc) — генерация Swagger документации из JSDoc комментариев.

### **🧩 Дополнительные библиотеки**
- [Bcrypt](https://www.npmjs.com/package/bcrypt) — библиотека для хеширования паролей, обеспечивающая безопасное хранение данных.
- [Multer](https://www.npmjs.com/package/multer) — middleware для обработки загрузки файлов на сервер.
- [Helmet](https://www.npmjs.com/package/helmet) — набор middleware для защиты Express-приложения путем установки HTTP-заголовков безопасности.
- [XSS-Clean](https://www.npmjs.com/package/xss-clean) — библиотека для защиты от XSS-атак путем очистки пользовательского ввода.
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) — middleware для ограничения количества запросов от одного IP-адреса.
- [Nodemon](https://www.npmjs.com/package/nodemon) — утилита для автоматического перезапуска сервера при изменении файлов (удобно для разработки).
- [Winston](https://www.npmjs.com/package/winston) — библиотека для логирования (удобна для отслеживания ошибок и событий).
- [Validator.js](https://www.npmjs.com/package/validator) — библиотека для валидации и санитизации данных (например, email, паролей).

---

## 🆕 Что нового в обновлении <a name="что-нового-в-обновлении"></a>

### Версия 4.1
- **Восстановление пароля**: Добавлен полный функционал восстановления пароля с токенами и ограничением по времени.
- **Swagger документация**: Добавлена интерактивная документация API с помощью Swagger UI.
- **Улучшенная обработка ошибок**: Улучшена обработка ошибок при восстановлении пароля и других операциях.

### Версия 4.0
- **DB Factory**: Создана фабрика (config/dbFactory.js), которая выбирает между SQLite (для разработки) и MongoDB (для продакшена) на основе NODE_ENV.
- **User Service**: Добавлен сервис (services/userService.js) для инкапсуляции бизнес-логики работы с пользователями (CRUD-операции).
- **Контроллеры**: Обновлены контроллеры, чтобы использовать UserService вместо прямых вызовов репозиториев.
- **Реализован BaseService** с общими CRUD-операциями
- **Сервис UserService** теперь наследуется от BaseService для переиспользования базовой логики
- **Теперь что бы работать с сущность для нее надо создать сервис и наследоваться от базового сервиса, тем самым она получит базовые CRUD методы, если надо что то посерьезнее просто надо это описать в этом же сервисе

---

## 📝 API Документация <a name="api-документация"></a>

В проекте реализована интерактивная документация API с помощью Swagger UI. Документация доступна по адресу:

```
http://localhost:4000/api-docs
```

### Как использовать Swagger UI:

1. Запустите сервер:
   ```
   node index.js
   ```

2. Откройте браузер и перейдите по адресу `http://localhost:4000/api-docs`

3. В Swagger UI вы увидите все доступные эндпоинты, сгруппированные по тегам:
   - Аутентификация (регистрация, вход, восстановление пароля)
   - Пользователи (информация о пользователе)
   - Аудио (загрузка и получение аудиофайлов)

4. Для тестирования эндпоинта:
   - Нажмите на нужный эндпоинт
   - Нажмите кнопку "Try it out"
   - Заполните необходимые параметры
   - Нажмите "Execute"
   - Получите результат запроса

---

## 🔑 Восстановление пароля <a name="восстановление-пароля"></a>

В проекте реализован полный функционал восстановления пароля:

### Процесс восстановления пароля:

1. **Запрос на восстановление пароля**:
   - Пользователь отправляет запрос на `/auth/forgot-password` с указанием email.
   - Сервер генерирует уникальный токен и сохраняет его в базе данных вместе со сроком действия (1 час).
   - В реальном приложении сервер отправил бы email с ссылкой для сброса пароля. В демо-версии токен возвращается в ответе.

2. **Сброс пароля**:
   - Пользователь отправляет запрос на `/auth/reset-password` с токеном и новым паролем.
   - Сервер проверяет токен, его срок действия и, если всё в порядке, обновляет пароль пользователя.
   - Токен становится недействительным после использования.

### Тестирование через Swagger UI:

1. Отправьте запрос на `/auth/forgot-password` с email пользователя.
2. Скопируйте полученный токен из ответа.
3. Отправьте запрос на `/auth/reset-password` с токеном и новым паролем.
4. Проверьте вход с новым паролем через `/auth/login`.

### Особенности реализации:

- Токен генерируется с помощью `crypto.randomBytes()` для обеспечения уникальности.
- Срок действия токена ограничен 1 часом для безопасности.
- Токен можно использовать только один раз.
- Реализована защита от перебора (rate limiting).

---

## 🛡️ Защиты от API-атак <a name="защиты-от-api-атак"></a>


### 1. **Helmet**
   - **Что это**: Helmet — это middleware для Express.js, который помогает защитить приложение, устанавливая различные HTTP-заголовки безопасности.
   - **Как используется**:
     ```javascript
     app.use(helmet());
     ```
   - **Что защищает**:
     - Устанавливает заголовки, такие как `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security` и другие, чтобы предотвратить атаки, такие как:
       - **Clickjacking** (атаки с использованием iframe).
       - **MIME-sniffing** (подмена типа контента).
       - **XSS** (межсайтовый скриптинг).
   - **Почему важно**: Эти заголовки помогают браузерам правильно интерпретировать контент и предотвращают многие распространенные атаки.

---

### 2. **XSS-Clean**
   - **Что это**: Middleware для защиты от XSS-атак (межсайтовый скриптинг).
   - **Как используется**:
     ```javascript
     app.use(xss());
     ```
   - **Что защищает**:
     - Очищает пользовательский ввод от потенциально опасных HTML и JavaScript-кодов.
     - Предотвращает внедрение вредоносных скриптов через пользовательские данные.
   - **Почему важно**: XSS-атаки могут привести к краже данных пользователей, подделке запросов и другим серьезным проблемам.

---

### 3. **Rate Limiting (Ограничение скорости запросов)**
   - **Что это**: Middleware для ограничения количества запросов от одного IP-адреса за определенный промежуток времени.
   - **Как используется**:
     ```javascript
     const limiter = rateLimit({
       windowMs: 15 * 60 * 1000, // 15 минут
       max: 100, // Ограничение на 100 запросов за окно windowMs для каждого IP
     });
     app.use(limiter);
     ```
   - **Что защищает**:
     - Предотвращает **DoS-атаки** (атаки на отказ в обслуживании) и **Brute Force-атаки** (перебор паролей или токенов).
     - Ограничивает количество запросов, которые может сделать злоумышленник за короткий промежуток времени.
   - **Почему важно**: Это помогает защитить сервер от перегрузки и злоупотреблений.

---

### 4. **CORS (Cross-Origin Resource Sharing)**
   - **Что это**: Middleware для управления кросс-доменными запросами.
   - **Как используется**:
     ```javascript
     app.use(cors());
     ```
   - **Что защищает**:
     - Позволяет контролировать, какие домены могут обращаться к вашему API.
     - Предотвращает **CSRF-атаки** (межсайтовая подделка запросов) и несанкционированный доступ к API с других доменов.
   - **Почему важно**: Без CORS злоумышленники могут использовать ваш API с других сайтов, что может привести к утечке данных.

---

### 5. **Cookie Parser**
   - **Что это**: Middleware для работы с cookies.
   - **Как используется**:
     ```javascript
     app.use(cookieParser());
     ```
   - **Что защищает**:
     - Позволяет безопасно работать с cookies, которые могут использоваться для хранения токенов аутентификации.
     - Предотвращает атаки, связанные с подделкой cookies.
   - **Почему важно**: Cookies часто используются для хранения чувствительных данных, таких как JWT-токены, и их защита критически важна.

---

### 6. **Multer (Загрузка файлов)**
   - **Что это**: Middleware для обработки загрузки файлов.
   - **Как используется**:
     ```javascript
     const upload = multer({ storage: storage, fileFilter });
     ```
   - **Что защищает**:
     - Проверяет тип загружаемых файлов с помощью `fileFilter`, чтобы предотвратить загрузку вредоносных файлов.
     - Ограничивает загрузку только допустимыми типами файлов (например, аудио).
   - **Почему важно**: Загрузка файлов — это уязвимое место для атак, таких как загрузка вредоносных скриптов или вирусов.

---

### 7. **Обработка ошибок**
   - **Что это**: Middleware для обработки ошибок.
   - **Как используется**:
     ```javascript
     app.use((err, req, res, next) => {
       res.status(500).json({ message: 'Внутренняя ошибка сервера' });
     });
     ```
   - **Что защищает**:
     - Предотвращает утечку информации об ошибках (например, стектрейсов) в ответах API.
     - Унифицирует обработку ошибок, чтобы злоумышленники не могли использовать ошибки для атак.
   - **Почему важно**: Утечка информации об ошибках может помочь злоумышленникам найти уязвимости в вашем приложении.

---

### 8. **Express JSON Parser**
   - **Что это**: Middleware для парсинга JSON-запросов.
   - **Как используется**:
     ```javascript
     app.use(express.json());
     ```
   - **Что защищает**:
     - Обрабатывает только корректные JSON-запросы, предотвращая атаки, связанные с некорректными данными.
   - **Почему важно**: Некорректные данные могут привести к сбоям в работе сервера или уязвимостям.

---
1. Фабрика баз данных (DBFactory)
Назначение
DBFactory — это класс, который отвечает за выбор и инициализацию репозитория в зависимости от окружения (NODE_ENV). Он позволяет легко переключаться между SQLite и MongoDB без изменения кода приложения.

1. Репозитории
2.1. Базовый репозиторий (BaseRepository)
Назначение
BaseRepository — абстрактный класс, определяющий интерфейс для всех репозиториев. Он задаёт стандартные CRUD-методы, которые должны быть реализованы в конкретных репозиториях.

2.2. Репозиторий SQLite (SQLiteUserRepository)
Назначение
Реализует доступ к данным пользователей в SQLite для режима разработки.

2.3. Репозиторий MongoDB (MongoUserRepository)
Назначение
Реализует доступ к данным пользователей в MongoDB для продакшен-режима.

3. Сервисы
3.1. Базовый сервис (BaseService)
Назначение
BaseService — абстрактный класс, предоставляющий стандартные CRUD-операции для всех сущностей. Он инкапсулирует бизнес-логику и работает с любым репозиторием.

3.2. Сервис пользователей (UserService)
Назначение
Наследуется от BaseService и добавляет специфичную для пользователей логику (например, валидацию).

Расширение
Для добавления новой сущности (например, post):

Создайте SQLitePostRepository и MongoPostRepository.
Добавьте их в DBFactory.getRepository.
Создайте PostService, наследующий BaseService.
---

## 👨‍💻 Для разработчиков (Back-end темы) <a name="для-разработчиков-back-end-темы"></a>

**Внимание**: Изменение роли по email временно доступно для тестирования. В будущем эта функциональность может быть изменена или удалена.

Этот проект открыт для всех, кто хочет помочь в разработке клона Spotify! Мы приветствуем любые идеи, улучшения и исправления. Вот как вы можете внести свой вклад:

1. **🎯 Выберите задачу**: Посмотрите список [TODO чата](https://plane.so) и выберите задачу, которую хотите выполнить.
2. **🛠 Создайте ветку!!!!**: Создайте новую ветку для ваших изменений.
3. **💻 Работайте над кодом**: Внесите изменения и улучшения.
4. **📤 Создайте Pull Request**: Отправьте Pull Request с описанием ваших изменений.

Мы рады каждому контрибьютору! 🚀

---

This project for SpotifyClone pet Community.
