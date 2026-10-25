export default async function handler(req, res) {
  try {
    const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?league=203&season=2023', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
}
