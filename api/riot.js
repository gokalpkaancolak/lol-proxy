export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path, region } = req.query;
  if (!path) return res.status(400).json({ error: 'path required' });

  const apiKey = process.env.RIOT_API_KEY;

  // Account API uses europe/americas/asia, others use euw1
  const host = region === 'europe'
    ? 'https://europe.api.riotgames.com'
    : 'https://euw1.api.riotgames.com';

  const url = `${host}/${path}`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Riot-Token': apiKey }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
