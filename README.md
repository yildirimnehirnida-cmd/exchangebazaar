# Exchange Bazaar — Frontend demo

İstanbul Üniversitesi pilotu için hazırlanmış HTML/CSS/JavaScript arayüz prototipi.

## Çalıştırma
1. ZIP dosyasını çıkarın.
2. `index.html` dosyasını tarayıcıda açın.
3. Daha iyi yerel geliştirme deneyimi için VS Code Live Server gibi basit bir statik sunucu kullanabilirsiniz.

## Bu sürümde bulunanlar
- Mobil uyumlu kampüs pazaryeri arayüzü
- Ürün kartları ve kategori filtreleri
- Arama
- Demo kredi cüzdanı
- Demo giriş/kayıt modalı
- Yerel demo ilan oluşturma
- Favori butonları ve bilgilendirme mesajları

## Önemli sınırlar
- Gerçek kimlik doğrulaması yapılmaz.
- İstanbul Üniversitesi üyeliği doğrulanmaz.
- Gerçek hesap veya şifre oluşturulmaz ve saklanmaz.
- Kredi bakiyesi yalnızca demo göstergesidir; gerçek kredi hareketi değildir.
- İlanlar yalnızca tarayıcı belleğinde tutulur ve yenilemede kaybolur.
- Kullanıcılar doğrulanmış olarak işaretlenmez.

## Sonraki aşama
Supabase Auth, doğrulanmış İstanbul Üniversitesi e-posta alan adı allowlist'i, veritabanı tabloları, Row Level Security (RLS), güvenli kredi hareketleri ve yönetici rolü eklenmelidir. İstanbul Üniversitesi'nin öğrenci e-posta alan adı resmî kaynaklardan doğrulanmadan varsayılmamalıdır. Supabase `service_role` anahtarı hiçbir zaman istemci tarafı koduna konulmamalıdır.
