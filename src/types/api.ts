// İstemci ile Cloudflare Functions arasındaki paylaşılan sözleşme.
// Sunucu dönüşleri ve istemci okumaları AYNI tipi kullanır; alan adı
// değişirse `npm run check` istemci tarafında da hata verir.

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface GuestbookListResponse {
  entries: GuestbookEntry[];
}

export interface GuestbookPostResponse {
  ok: boolean;
  pending?: boolean;
  error?: string;
}

export interface ViewsResponse {
  views: number;
}

/** `data-strings` üzerinden arayüze taşınan çeviri metinleri (Guestbook.astro). */
export interface GuestbookStrings {
  /** Not onaya düştü bildirimi */
  pending: string;
  /** Mesaj çok kısa hatası */
  short: string;
  /** Saatlik gönderim sınırı hatası */
  rate: string;
  /** Diğer/bilinmeyen hata */
  generic: string;
}
