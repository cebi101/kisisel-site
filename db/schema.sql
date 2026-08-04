-- Cloudflare D1 şeması — Cloudflare panelindeki D1 konsolunda bir kez çalıştırılır

-- Sayaçlar (şimdilik yalnız toplam görüntülenme)
CREATE TABLE IF NOT EXISTS counters (
  key TEXT PRIMARY KEY,
  n   INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO counters (key, n) VALUES ('views', 0);

-- Ziyaretçi defteri — onaylanmadan yayımlanmaz (approved = 0)
CREATE TABLE IF NOT EXISTS guestbook (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL,
  approved   INTEGER NOT NULL DEFAULT 0,
  ip_hash    TEXT           -- ham IP saklanmaz, yalnızca geri döndürülemez özet
);
CREATE INDEX IF NOT EXISTS idx_guestbook_public
  ON guestbook (approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_rate
  ON guestbook (ip_hash, created_at);
