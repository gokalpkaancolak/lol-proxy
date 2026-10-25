const https = require('https');

module.exports = function(req, res) {
  const options = {
    hostname: 'sportapi7.p.rapidapi.com',
    path: '/api/v1/tournament/1/season/61627/events',
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
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
        res.status(200).json({ hata: 'Gelen veri okunamadı', detay: data });
      }
    });
  });

  request.on('error', (error) => {
    res.status(200).json({ hata: 'Sunucu bağlantı hatası', detay: error.message });
  });

  request.end();
};
