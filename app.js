const express = require('express');
const app = express();

// Указываем Express использовать статическую папку для обслуживания файлов
app.use(express.static('public'));

// Определяем маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
