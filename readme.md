# Finans Takip Uygulaması

Bu uygulama, kullanıcıların gelir ve giderlerini takip etmelerine yardımcı olmak amacıyla geliştirilmiştir. Kullanıcılar gelirlerini ve giderlerini ekleyebilir, toplam gelir, gider ve net toplam hesaplamalarını görüntüleyebilir. Ayrıca uygulama, kullanıcıların gelir ve giderlerini grafiksel olarak görselleştirir.

## Özellikler

- **Gelir Ekleme**: Kullanıcılar gelirlerini ekleyebilir.
- **Gider Ekleme**: Kullanıcılar giderlerini ekleyebilir.
- **Gelir ve Gider Tablosu**: Eklenen gelir ve giderler tablo olarak görüntülenir.
- **Net Toplam Hesaplama**: Gelirlerden giderler çıkarılarak net toplam hesaplanır.
- **Grafik Görselleştirme**: Gelir ve giderler, grafikle görselleştirilir.
- **Silme İşlemi**: Eklenen gelir ve giderler silinebilir.

## Teknolojiler

- **Frontend**: HTML, CSS
- **Backend**: PHP
- **Veri Depolama**: PHP session
- **Grafikler**: Chart.js

## Kurulum

### Gereksinimler

- PHP 7.x veya üstü
- Web sunucu (Apache veya Nginx)
- Tarayıcı (Chrome, Firefox vb.)

### Adımlar

1. Projeyi bilgisayarınıza klonlayın veya dosyaları indirin.

```bash
git clone https://github.com/busenurcetin/finans-takip-uygulamasi.git
```
2. Projeyi web sunucusuna yükleyin (örneğin, Apache veya Nginx).
3. PHP'nin düzgün çalıştığından emin olun.
4. Projeyi tarayıcıda açın. Örneğin, localhost/finans-takip-uygulamasi/index.php adresine gidin.

### Kullanım
- Gelir Ekleme: "Gelir Ekle" formunu doldurun ve "Gelir Ekle" butonuna tıklayın.
- Gider Ekleme: "Gider Ekle" formunu doldurun ve "Gider Ekle" butonuna tıklayın.
- Silme: Eklenen gelir ve giderlerin yanında bulunan çöp kutusu simgesine tıklayarak silebilirsiniz.
- Sonuç: Sayfa altında toplam gelir, toplam gider ve net toplam bilgilerini görebilirsiniz.
- Grafik: Grafik alanında gelir ve giderlerin görselleştirilmiş halini görüntüleyebilirsiniz.

### Katkı

1. Repo'yu fork'layın.
2. Yeni bir feature branch oluşturun: git checkout -b yeni-feature.
3. Değişikliklerinizi yapın ve commit'leyin: git commit -am 'Yeni özellik eklendi'.
4. Branch'inizi push'layın: git push origin yeni-feature.
5. Pull request oluşturun.

## Sıkça Sorulan Sorular (FAQ)

**Q1: Gelir ve gider verilerim kayboluyor, neden?**
- Bu, verilerin session'lar ile saklanmasından kaynaklanmaktadır. Tarayıcıyı her yenilediğinizde session verisi sıfırlanabilir. Uygulama ilerleyen sürümlerinde veritabanı desteği eklenebilir.

**Q2: Grafik doğru görünmüyor, ne yapmalıyım?**
- Eğer grafik görüntülenmiyorsa, Chart.js kütüphanesinin düzgün yüklenip yüklenmediğini kontrol edin ve console'da hata olup olmadığını inceleyin.


## Geliştiriciler
- [Buse Nur Çetin](https://github.com/busenurcetin) - Proje sahibi ve geliştirici

## İletişim

Buse Nur Çetin
- GitHub: [@busenurcetin](https://github.com/busenurcetin)
- LinkedIn: [busenurcetin](https://www.linkedin.com/in/busenurcetin/)
- Twitter: [@busenurcetin16](https://x.com/busenurcetin16) 