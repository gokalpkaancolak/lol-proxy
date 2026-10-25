module.exports = async function(req, res) {
  try {
    const url = 'https://sportapi7.p.rapidapi.com/api/v1/tournament/1/season/61627/events';
    const apiCevap = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
      }
    });

    // Veriyi çökmeyi engellemek için önce düz metin olarak okuyoruz
    const metin = await apiCevap.text(); 
    
    try {
      // Eğer gerçek bir maç verisiyse JSON'a çevir
      const veri = JSON.parse(metin);
      res.status(200).json(veri);
    } catch (parseHatasi) {
      // API maç yerine HTML veya hata metni yolladıysa, onu sayfaya gönder
      res.status(200).json({ 
        hata: 'API maç listesi yerine şu metni gönderdi', 
        detay: metin.substring(0, 300) 
      });
    }
  } catch (hata) {
    res.status(200).json({ hata: 'Sunucu fetch hatası', detay: hata.message });
  }
};
