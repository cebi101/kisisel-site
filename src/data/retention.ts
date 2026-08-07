// SAKLAMA SÜRELERİ — TEK KAYNAK.
//
// Aydınlatma metninde yazan süre ile sunucunun gerçekten uyguladığı süre
// birbirinden sürüklenebilir ve hiçbir test iki tarafı karşılaştırmaz.
// Bu yüzden hem uçlar hem KVKK metni buradan okur; tests/privacy.test.ts
// ikisinin eşit olduğunu doğrular.

/** Onaylanmayan ziyaretçi notu bu süre sonunda silinir. Onaylı notlar silinmez. */
export const ONAYSIZ_NOT_GUN = 7;

/** Hız sınırı için tutulan IP özeti bu süre sonunda NULL'lanır. */
export const IP_OZETI_SAAT = 1;

/** Görüntülenme tekilleştirme kayıtları bu süre sonunda silinir. */
export const GORUNTULENME_GUN = 2;

/** İletişim formu hız sınırı kayıtları bu süre sonunda silinir. */
export const ILETISIM_KAYDI_SAAT = 1;

/**
 * İletişim mesajları /yonetim ekranından okunana kadar saklanır.
 * Otomatik silme YOK — Şeyma okuyup elle siler. Bu, metinde böyle beyan
 * edilmelidir (tests/privacy.test.ts kontrol eder).
 */
export const ILETISIM_MESAJI = "elle silinene kadar";
