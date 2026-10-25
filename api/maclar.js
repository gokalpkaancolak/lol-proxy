module.exports = async function(req, res) {
  try {
    // Bağlantının sonunu maçları getirecek şekilde 'events' olarak güncelledik
    const url = 'https://sportapi7.p.rapidapi.com/api/v1/tournament/1/season/61627/events';
    const apiCevap = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
      }
    });

    const veri = await apiCevap.json();
    res.status(200).json(veri);
  } catch (hata) {
    res.status(200).json({ hata: 'Bağlantı koptu' });
  }
};
