export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path, region } = req.query;
  if (!path) return res.status(400).json({ error: 'path required' });

  const apiKey = process.env.RIOT_API_KEY;
  
  // Bölgeye göre Riot sunucusunu seçiyoruz
  let host = 'https://euw1.api.riotgames.com'; // Varsayılan EUW
  if (region === 'europe') {
    host = 'https://europe.api.riotgames.com'; // Hesap ID sorguları için
  } else if (region === 'tr1') {
    host = 'https://tr1.api.riotgames.com'; // TR sunucusu rank sorguları için
  }

  const decodedPath = decodeURIComponent(path);
  const url = `${host}/${decodedPath}`;

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
