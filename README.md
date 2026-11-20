# KatsuiRiku: Penjahit Cerita

Web visual novel prototype untuk prolog perjalanan KatsuiRiku Ch.

Project ini **terpisah** dari repository website commission `katsuiriku-commis`. Tujuannya supaya cerita, aset, dan eksperimen game tidak mengganggu site commission.

## Status saat ini

- Prolog “Benang Pertama” (16 scene + 1 pilihan bercabang)
- Bilingual Indonesia / English, bisa diganti kapan saja
- Menu poster GFX dengan Riku full-body concept pose melayang
- Lore / Codex bilingual dengan 9 entri dan filter kategori
- Inventory publik: semua orang bisa melihat, hanya admin yang bisa mengedit
- Admin inventory di `/admin/` dengan Supabase Auth + RLS
- Peta Dunia dengan 7 sektor cerita dan detail lokasi
- Pengaturan kecepatan teks dan reduce motion
- Palet dan font mengikuti website commission: Bebas Neue, Fredoka, Manrope, Ubuntu
- Artwork karakter dan background masih concept SVG, belum art final
- Belum ada audio dan gallery
- Tombol **Lanjutkan / Continue** sudah dihapus. Prolog selalu mulai dari awal.

## Cara menjalankan

Dari folder ini:

```bash
python -m http.server 8766 --bind 127.0.0.1
```

Lalu buka:

```text
http://127.0.0.1:8766/
```

Admin inventory:

```text
http://127.0.0.1:8766/admin/
```

## Preview shortcut

Untuk melihat scene tertentu tanpa mengklik dari awal:

```text
http://127.0.0.1:8766/?play=1&scene=p7&instant=1&lang=en
```

- `play=1` langsung masuk ke prolog
- `scene=p7` memilih scene (contoh: `p1`, `p7`, `p11`, `p12a`, `p16`)
- `instant=1` membuat teks langsung muncul
- `lang=id` atau `lang=en` memaksa bahasa saat halaman dibuka

## Struktur file

```text
katsuiriku-journey/
  index.html
  admin/
    index.html
    admin.css
    admin.js
  assets/
    css/style.css
    js/i18n.js
    js/story.js
    js/app.js
    js/inventory-defaults.js
    js/inventory.js
    js/worldmap.js
    js/lore.js
    js/supabase-config.js
    img/
      riku.png
      kanna.png
      _source/
        riku-source.png
        kanna-source.png
      bg-menu.svg
      bg-cosmos.svg
      bg-memory.svg
      bg-stage.svg
      favicon.svg
  supabase/
    migrations/20261111_vn_inventory.sql
  robots.txt
  .gitignore
  README.md
```

## Inventory dan Supabase

Inventory publik membaca tabel `public.vn_inventory` dari Supabase. Kalau tabel belum ada atau jaringan gagal, game otomatis memakai data placeholder dari `assets/js/inventory-defaults.js`.

### 1. Jalankan SQL migration

Buka **Supabase Dashboard → SQL Editor**, lalu jalankan:

```text
supabase/migrations/20261111_vn_inventory.sql
```

SQL ini membuat tabel `vn_inventory`, mengaktifkan RLS, dan mengizinkan:

- `anon` hanya bisa `select` baris dengan `visible = true`
- hanya user yang lolos `public.is_admin()` yang bisa menulis

Migration juga mengisi 9 item starter **hanya jika tabel masih kosong**. Item starter itu boleh diedit atau dihapus dari `/admin/`.

### 2. Login admin

Buka `/admin/` dan login dengan akun admin Supabase yang sama seperti panel commission. Halaman admin memeriksa RPC `is_admin`, jadi akun biasa akan ditolak.

### 3. Tambah / edit item

Form admin mendukung:

- Nama ID dan EN
- Deskripsi ID dan EN
- Kategori: artifact, tool, keepsake, map, supply, other
- Rarity: common, uncommon, rare, epic, legendary
- Icon (emoji / simbol)
- Image URL opsional
- Sort order
- Visibility publik

Item yang `visible = false` tidak akan muncul di inventory publik.

### 4. Catatan keamanan

- `assets/js/supabase-config.js` hanya berisi **anon public key**, aman untuk browser.
- Jangan pernah menaruh `service_role` key di repo.
- Akses tulis dilindungi RLS dan login admin.
- Halaman `/admin/` boleh publik di GitHub Pages; tanpa sesi admin, isinya hanya form login.

## Mengganti art karakter

Art karakter final sudah dipakai: Riku **half-body** dan Kanna **full-body**.

### Riku — half-body

File: `assets/img/riku.png` (transparan, sudah dipangkas dari `assets/img/_source/riku-source.png`).

- Di menu, Riku tampil sebagai **portrait card** dengan pinggiran meja sebagai batas bawah. Ukuran card diatur di `.poster-visual .riku-parallax` (`style.css`).
- Di VN, Riku memakai `data-pose="bust"` sehingga tampil sebagai close-up dan dipatok ke bawah panggung.
- Kalau mengganti art, pertahankan rasio potret dan ruang kosong di atas kepala agar tidak menabrak stempel poster.

### Kanna — full-body

File: `assets/img/kanna.png` (transparan, sudah dipangkas dari `assets/img/_source/kanna-source.png`).

- Di VN, Kanna memakai `data-pose="full"`, jadi tinggi badannya dijaga penuh sampai sepatu.
- Ukuran ada di `.vn-character[data-pose="full"]`; jangan disamakan dengan Riku karena rasionya jauh lebih jangkung.

Path gambar diatur di dua tempat:

- `index.html` pada `img.riku-img` dan `#vn-character-img` (gambar awal)
- `assets/js/app.js` pada `setCharacter()` untuk `riku` dan `kanna`

`setCharacter()` juga menentukan `data-pose`, jadi kalau menambah karakter baru, tentukan apakah ia `bust` atau `full`.

### Background

Ganti salah satu file berikut:

- `assets/img/bg-menu.svg`
- `assets/img/bg-cosmos.svg`
- `assets/img/bg-memory.svg`
- `assets/img/bg-stage.svg`

Atau tambahkan background baru di CSS:

```css
.bg-nama-baru {
  background-image: url("../img/bg-nama-baru.svg");
}
```

Lalu pakai `bg: "nama-baru"` di `story.js`.

### Palet dan font

Palet dan font diambil dari website commission:

```css
--surface: #FBF4EC;
--ink: #3A2620;
--rose: #B86B6B;
--rose-deep: #8E4F4F;
--rose-soft: #D9A6A6;
--gold: #C9A227;
--violet: #8E6AA8;
--sage: #6F8B7E;
```

Font yang dipakai:

- **Bebas Neue** untuk judul besar
- **Fredoka** untuk nama kartu / karakter
- **Manrope** untuk label kecil
- **Ubuntu** untuk body dan UI

Jangan menambahkan font baru tanpa mengubah `index.html` dan `style.css`.

## Mengedit cerita

Semua dialog ada di `assets/js/story.js`.

Setiap scene punya bentuk seperti ini:

```js
p1: {
  progress: 1,
  bg: "cosmos",
  character: "riku",
  side: "right",
  speaker: { id: "Riku", en: "Riku" },
  text: {
    id: "Teks bahasa Indonesia.",
    en: "English text."
  },
  next: "p2"
}
```

Untuk pilihan:

```js
choices: [
  {
    text: { id: "Pilihan A", en: "Choice A" },
    next: "p12a"
  },
  {
    text: { id: "Pilihan B", en: "Choice B" },
    next: "p12b"
  }
]
```

Kalau `next: null` dan `end: true`, scene tersebut akan memunculkan layar akhir prolog.

## Menambah / mengubah terjemahan UI

Label menu, inventory, peta, pengaturan, dan tombol ada di `assets/js/i18n.js`.

Struktur:

```js
const I18N = {
  id: { ... },
  en: { ... }
};
```

Kalau menambah bahasa baru, tambahkan object bahasa baru dan tombol `data-lang` di HTML.

## Peta Dunia

Data lokasi ada di `assets/js/worldmap.js`. Setiap lokasi punya:

```js
{
  id: "kanna-star",
  x: 63,
  y: 22,
  status: "available", // available | locked | unknown
  icon: "★",
  title: { id: "Bintang Kanna", en: "Kanna's Star" },
  desc: { id: "...", en: "..." }
}
```

Ubah `x` / `y` untuk memindahkan titik di peta. Tambah object baru untuk menambah lokasi.

## Lore / Codex

Entri codex ada di `assets/js/lore.js`. Setiap entri punya:

```js
{
  id: "the-loom",
  category: "world", // world | character | rule | event | glossary
  title: { id: "Tenun Semesta", en: "The Loom" },
  body: { id: "...", en: "..." },
  quote: { id: "...", en: "..." } // opsional
}
```

Filter kategori, jumlah entri, dan accordion dirender otomatis oleh `window.KatsuiLore`. Kalau menambah kategori baru, tambahkan labelnya di `i18n.js` pada `lore.category`.

## Deploy ke repository baru

1. Buat repository baru di GitHub, misalnya `katsuiriku-journey`.
2. Dari folder ini:

```bash
git init
git add .
git commit -m "Initial visual novel prototype"
git branch -M main
git remote add origin https://github.com/ChickenKatsui/katsuiriku-journey.git
git push -u origin main
```

3. Buka **Settings → Pages**.
4. Pilih **Deploy from a branch**.
5. Branch `main`, folder `/ (root)`.
6. Simpan dan tunggu build.
7. URL akan menjadi:

```text
https://chickenkatsui.github.io/katsuiriku-journey/
```

Admin akan tersedia di:

```text
https://chickenkatsui.github.io/katsuiriku-journey/admin/
```

## Rencana berikutnya

- Tambah audio ambient / BGM
- Tambah gallery CG
- Tambah chapter 1
- Simpan pilihan penting untuk cerita berikutnya
- Tambah credits dan halaman about yang lebih lengkap
- Pindahkan data Peta Dunia ke Supabase kalau perlu admin editing

## Catatan

Ini masih prototype. Cerita, nama scene, dialog, dan isi inventory boleh diubah total tanpa menyentuh mesin visual novel.
