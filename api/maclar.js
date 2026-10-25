module.exports = async function(req, res) {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=203&season=2026';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Maçlar çekilemedi' });
  }
};
