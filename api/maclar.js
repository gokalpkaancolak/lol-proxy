const https = require('https');

module.exports = function(req, res) {
  const options = {
    hostname: 'api-football-v1.p.rapidapi.com',
    path: '/v3/fixtures?league=203&season=2023',
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData);
      } catch (error) {
        res.status(500).json({ error: 'API verisi okunamadı' });
      }
    });
  });

  request.on('error', (error) => {
    res.status(500).json({ error: 'API bağlantı hatası' });
  });

  request.end();
};
