const https = require('https');

module.exports = function(req, res) {
  const options = {
    hostname: 'api-football-v1.p.rapidapi.com',
    path: '/v3/fixtures?league=203&season=2026',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        res.status(200).json(JSON.parse(data));
      } catch (error) {
        res.status(500).json({ hata: 'Veri okunamadı', detay: error.message });
      }
    });
  });

  request.on('error', (error) => {
    res.status(500).json({ hata: 'Sunucuya bağlanamadı', detay: error.message });
  });

  request.end();
};
