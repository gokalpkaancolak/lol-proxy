module.exports = async function(req, res) {
  try {
    // Çalıştığını bildiğimiz /tournament/1/ kök yapısını sezon ID'mizle birleştiriyoruz
    const url = 'https://sportapi7.p.rapidapi.com/api/v1/tournament/1/season/98080/events';
    const apiCevap = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '94f86561ebmsh14de72fe8dec0afp111239jsnc2b0be6b89c3',
        'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
      }
    });

    const metin = await apiCevap.text(); 
    
    try {
      const veri = JSON.parse(metin);
      res.status(200).json(veri);
    } catch (parseHatasi) {
      res.status(200).json({ 
        hata: 'API veri formatı uyuşmadı', 
        detay: metin.substring(0, 300) 
      });
    }
  } catch (hata) {
    res.status(200).json({ hata: 'Sunucu fetch hatası', detay: hata.message });
  }
};
