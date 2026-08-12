# MFA Global Consultancy — Hostinger + Supabase

## Mimari

- **Hostinger**: Next.js (Node.js Web App) — site + admin panel
- **Supabase Postgres**: tüm dinamik içerik (Prisma)
- **Supabase Storage**: görseller (`media` bucket)

---

## 1) Supabase hazırlığı

### Database
1. Supabase → **Project Settings → Database**
2. **Connection string** al:
   - **Transaction pooler (6543)** → `DATABASE_URL` (+ `?pgbouncer=true`)
   - **Session / Direct (5432)** → `DIRECT_URL`
3. Şifreyi URL’de encode et (ör. `@` → `%40`)

### Storage
1. Supabase → **Storage → New bucket**
2. Bucket adı: `media`
3. **Public bucket** işaretle
4. Policies (public read + service role write yeterli):
   - Public: `SELECT` for everyone on `media`
   - Upload’lar server tarafında **service role** ile yapılır

### API keys
Supabase → **Project Settings → API**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (gizli — sadece server)

---

## 2) Lokal bağlama

`.env` dosyanı `.env.example`’dan kopyala, değerleri doldur:

```bash
npm install
npm run db:setup
npm run dev
```

Storage için Supabase **S3 Access Keys** kullanılır:
- `SUPABASE_S3_ENDPOINT`
- `SUPABASE_S3_REGION`
- `SUPABASE_S3_ACCESS_KEY_ID`
- `SUPABASE_S3_SECRET_ACCESS_KEY`

Bucket adı: `media` (Supabase Storage’da public olmalı).

---

## 3) Hostinger’a alma

### Gereken plan
**Business Web Hosting** veya **Cloud** plan (Node.js Web Apps destekli).  
Paylaşımlı “Single/Premium” tek başına Next.js SSR için yetmez.

### Adımlar
1. Projeyi **GitHub**’a push et (`.env` commit etme)
2. hPanel → **Websites → Add Website → Node.js web app**
3. **Import Git Repository** ile repo’yu bağla
4. Ayarlar (Hostinger önerisi):
   - **Node.js**: `20`
   - **Install**: `npm ci` (veya `npm install`)
   - **Build**: `npm run build`
   - **Start**: `npm run start -- -p $PORT`
5. **Environment Variables** ekle (aşağıdaki liste)
6. Deploy et
7. İlk deploy sonrası seed için lokalden (production DB’ye bir kez):

```bash
# .env içinde production DATABASE_URL / DIRECT_URL varken:
npm run db:seed
```

veya Hostinger SSH varsa sunucuda aynı komut.

8. Domain’i siteye bağla (DNS A/CNAME Hostinger yönlendirmesi)

### Hostinger env listesi

```
NEXT_PUBLIC_SITE_URL=https://mfaglobalconsultancy.com
DATABASE_URL=...
DIRECT_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_MEDIA_BUCKET=media
AUTH_SECRET=uzun-rastgele-secret
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@mfaglobalconsultancy.com
SMTP_PASS=mailbox-sifresi
MAIL_FROM=info@mfaglobalconsultancy.com
MAIL_TO=info@mfaglobalconsultancy.com
```

### SEO (canlı sonrası)

1. Google Search Console → `https://mfaglobalconsultancy.com` property ekle
2. Verification kodunu Admin → Site ayarları → SEO alanına yapıştır
3. Sitemap gönder: `https://mfaglobalconsultancy.com/sitemap.xml`
4. robots: `https://mfaglobalconsultancy.com/robots.txt`

---

## 4) Canlı kontrol

- Site: `https://senin-domain.com`
- Admin: `https://senin-domain.com/admin`
- Medya: Admin → Medya → dosya yükle (Supabase Storage’a gider)

---

## Notlar

- SQLite kalktı; artık DB tamamen Supabase Postgres.
- `npm run build` içinde `prisma db push` var — şema sunucuya otomatik uygulanır.
- Service role key’i asla frontend’e koyma.
- Admin şifresini production’da mutlaka değiştir.
