-- Cloudflare D1 şeması — Cloudflare panelindeki D1 konsolunda bir kez çalıştırılır

-- Sayaçlar (yalnız toplam görüntülenme — tek satır, kişisel veri yok)
CREATE TABLE IF NOT EXISTS counters (
  key TEXT PRIMARY KEY,
  n   INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO counters (key, n) VALUES ('views', 0);

-- Görüntülenme tekilleştirme: aynı ziyaretçi aynı gün yalnızca bir kez sayılır.
-- ip_hash = gizli IP_SALT ile tuzlanmış SHA-256 özeti; ham IP hiçbir yerde tutulmaz.
-- 2 günden eski satırlar API tarafından otomatik silinir.
CREATE TABLE IF NOT EXISTS view_hits (
  ip_hash TEXT NOT NULL,
  day     TEXT NOT NULL,
  PRIMARY KEY (ip_hash, day)
);

-- Ziyaretçi defteri — onaylanmadan yayımlanmaz (approved = 0)
CREATE TABLE IF NOT EXISTS guestbook (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL,
  approved   INTEGER NOT NULL DEFAULT 0,
  ip_hash    TEXT           -- yalnızca hız sınırı için; 1 saat sonra NULL'lanır
);
CREATE INDEX IF NOT EXISTS idx_guestbook_public
  ON guestbook (approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_rate
  ON guestbook (ip_hash, created_at);

-- İletişim formu hız sınırı sayacı.
-- MESAJ İÇERİĞİ BURAYA YAZILMAZ; yalnızca tuzlanmış IP özeti ve zaman.
-- 1 saatten eski satırlar API tarafından otomatik silinir.
CREATE TABLE IF NOT EXISTS contact_hits (
  ip_hash    TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_contact_rate
  ON contact_hits (ip_hash, created_at);
