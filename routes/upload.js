const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require("multer");
const csv = require("csv-parser");

// Создание хранилища для файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Папка, куда будут сохраняться файлы
    },
    filename: function (req, file, cb) {
        // Генерация уникального имени файла
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({storage: storage});


router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
    }

    const results = [];
    const fileAnalysis = {
        numericColumns: {},
        categoricalColumns: {},
        labels: '',
        values: '',
    };

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            // Предположим, что первая строка содержит заголовки
            for (const key in data) {
                if (!isNaN(data[key])) {
                    if (!fileAnalysis.numericColumns[key]) {
                        fileAnalysis.numericColumns[key] = [];
                    }
                    fileAnalysis.numericColumns[key].push(parseFloat(data[key]));
                } else {
                    if (!fileAnalysis.categoricalColumns[key]) {
                        fileAnalysis.categoricalColumns[key] = [];
                    }
                    fileAnalysis.categoricalColumns[key].push(data[key]);
                }
            }
            results.push(data);
        })
        .on('end', () => {
            fileAnalysis.labels = Object.keys(results[0]); // Получаем имена колонок из первого объекта в массиве
            fileAnalysis.values = results.map(item => Object.values(item)); // Получаем значения всех колонок в виде массива



            // Удаление файла после обработки
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла', err);
                    return res.status(500).json({ message: 'Ошибка при удалении файла' });
                }

                // Отправка результатов анализа данных на фронтенд
                res.status(200).json(fileAnalysis);
            });
        });
});


module.exports = router;
