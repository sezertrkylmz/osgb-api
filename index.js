const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// 🔒 InfluxDB Bağlantı Bilgileri (BURAYI KENDİ VERİLERİNLE DEĞİŞTİR)
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com'; // senin URL'in
const token = 'BAqvCGXKWq3wXkbcUn7m_f82zxzyJNoWc8gx4h26tsGutmidXy3moUPxn7bpAJwHavab5bC2e-Iv9-fm2pPdCg=='; // senin token
const org = 'OSGB-API'; // senin org adı
const bucket = 'sensor-data'; // bucket adı

const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);
writeApi.useDefaultTags({ host: 'osgb-api' });

app.use(express.json());

app.post('/api/data', (req, res) => {
  const data = req.body;

  console.log('Veri alındı:', data);

  const point = new Point('sensor_readings')
    .tag('device', data.device_id || 'unknown')
    .floatField('co2', data.co2)
    .floatField('tvoc', data.tvoc)
    .floatField('pm25', data.pm25)
    .floatField('temp', data.temp)
    .floatField('humidity', data.humidity)
    .floatField('noise', data.noise);

  writeApi.writePoint(point);
  res.status(200).send('Veri InfluxDB’ye yazıldı.');
});

app.get('/', (req, res) => {
  res.send('OSGB API aktif 🚀');
});

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
