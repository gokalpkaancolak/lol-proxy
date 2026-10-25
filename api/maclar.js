module.exports = async function(req, res) {
  try {
    const url = 'https://sportapi7.p.rapidapi.com/api/v1/tournament/1/season/61627/team/35/events/last/0';
    const apiCevap = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
      }
    });

    const veri = await apiCevap.json();
    res.status(200).json(veri);
  } catch (hata) {
    res.status(200).json({ events: [] });
  }
};
