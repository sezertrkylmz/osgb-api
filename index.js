const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/data', (req, res) => {
  console.log('Veri alındı:', req.body);
  res.status(200).send('Veri alındı.');
});

app.get('/', (req, res) => {
  res.send('OSGB API aktif 🚀');
});

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
