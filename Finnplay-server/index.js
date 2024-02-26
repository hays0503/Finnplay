const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const secretKey = 'your_secret_key'; // Cекретный ключ

const gamelist = require('./data.json');

// Middleware для парсинга JSON и URL-кодированных данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.send();
});


// Middleware для проверки JWT при каждом запросе (кроме регистрации и аутентификации)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'Нет токена' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Ошибка аутентификации токена' });

    req.userId = decoded.id;
    next();
  });
};

// База данных пользователей (в памяти)
const users = [];

const registerUser = (username, password) => {
  // Проверка наличия пользователя
  if (users.find(user => user.username === username)) {
    return res.status(400).send({ message: 'Пользователь уже существует' });
  }

  // Добавление пользователя
  const User = { id: users.length + 1, username, password };
  

  // Создание JWT
  const token = jwt.sign({ id: User.id }, secretKey, {
    expiresIn: 86400 // Срок действия токена: 24 часа
  });

  users.push({User, token: token});

  return { auth: true, token };
}

app.get('/listgame', (req, res) => {
  // Проверка наличия пользователя
  const {authorization} = req.headers;
  const token = authorization.split(' ')[1];
  const user = users.find((u) => { return u.token === token?u:undefined});

  if (!user) return res.status(401).send({ auth: false, message: 'Ошибка аутентификации' });
  
  return res.status(200).send({ auth: true, gamelist});
});

// Регистрация пользователя
app.post('/register', (req, res) => {
  return res.status(200).send(registerUser(req.body.username, req.body.password));
});

// Аутентификация пользователя
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.User.username === username && u.User.password === password);

  if (!user) return res.status(401).send({ auth: false, message: 'Ошибка аутентификации' });

  console.log('Успешная аутентификация ',user.User.username,' ',user.User.password,' ',user.token)

  res.status(200).send({ auth: true, token:user.token });
});

// Защищенный маршрут, требующий JWT для доступа
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send({ message: 'Доступ разрешен', userId: req.userId });
});

// Запуск сервера
app.listen(PORT, () => {
  registerUser('player1','player1');
  registerUser('player2','player2');
  console.log(users)
  console.log(`Сервер запущен на порту ${PORT}`);
});
