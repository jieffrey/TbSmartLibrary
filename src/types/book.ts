export interface Book {
  id: number;
  judul: string;
  penulis?: string;
  penerbit?: string;
  tahun_terbit?: string;
  kategori?: string;
  stok: number;
  image_url?: string;
  qr_code?: string;
  created_at?: string;
  updated_at?: string;
}
