-- ============================================================
-- KatsuiRiku Journey — public inventory
-- Run this in Supabase Dashboard -> SQL Editor.
-- Public visitors can read visible rows.
-- Only authenticated admins can write (RLS + /admin/ UI).
-- ============================================================

create table if not exists public.vn_inventory (
  id uuid primary key default gen_random_uuid(),
  name_id text not null,
  name_en text,
  description_id text not null default '',
  description_en text,
  category text not null default 'other',
  rarity text not null default 'common',
  icon text not null default '✦',
  image_url text not null default '',
  sort_order integer not null default 100,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vn_inventory enable row level security;

drop policy if exists "vn_inventory public read" on public.vn_inventory;
create policy "vn_inventory public read"
  on public.vn_inventory
  for select
  using (visible = true);

drop policy if exists "vn_inventory authenticated write" on public.vn_inventory;
drop policy if exists "vn_inventory admin write" on public.vn_inventory;
create policy "vn_inventory admin write"
  on public.vn_inventory
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select on public.vn_inventory to anon;
grant all on public.vn_inventory to authenticated;
grant execute on function public.is_admin() to authenticated;

-- Optional starter rows. They only insert when the table is still empty.
-- Delete or edit them freely from /admin/.
insert into public.vn_inventory
  (name_id, name_en, description_id, description_en, category, rarity, icon, sort_order)
select
  v.name_id, v.name_en, v.description_id, v.description_en,
  v.category, v.rarity, v.icon, v.sort_order
from (values
  (
    'Benang Bintang',
    'Star Thread',
    'Benang rose-gold yang muncul saat Riku menemukan cerita pertamanya. Hangat, rapuh, dan selalu berdenyut pelan seperti jantung yang sedang menunggu.',
    'The rose-gold thread that appeared when Riku found her first story. Warm, fragile, and always pulsing softly like a heart that is waiting.',
    'artifact', 'rare', '✦', 10
  ),
  (
    'Kristal Memori',
    'Memory Crystal',
    'Kristal yang menyimpan satu cerita utuh. Di dalamnya, suara Kanna berulang seperti ombak di ruang tertutup—hangat, aman, tapi perlahan terasa sepi.',
    'A crystal that holds one complete story. Inside, Kanna''s voice repeats like a tide in a closed room—warm, safe, but slowly growing lonely.',
    'artifact', 'epic', '◆', 20
  ),
  (
    'Jarum Jahit Cerita',
    'Story Needle',
    'Jarum emas yang bisa memotong dan menyambung momen tanpa merusak alurnya. Riku memakainya untuk menjahit gema, bukan untuk mengganti cerita asli.',
    'A golden needle that can cut and reconnect moments without breaking their flow. Riku uses it to sew echoes, never to replace the original story.',
    'tool', 'legendary', '✧', 30
  ),
  (
    'Cangkir Kanna',
    'Kanna''s Cup',
    'Cangkir hangat dari stream pertama Kanna. Masih wangi teh vanilla, meskipun isinya sudah lama habis.',
    'A warm cup from Kanna''s first stream. It still smells of vanilla tea, even though it has long been empty.',
    'keepsake', 'common', '☕', 40
  ),
  (
    'Tiket Konser Bintang',
    'Starlight Concert Ticket',
    'Tiket konser virtual yang tidak pernah benar-benar berakhir. Di sudutnya ada tulisan kecil: "Sampai jumpa lagi."',
    'A virtual concert ticket that never truly ends. A small note in the corner reads: "See you again."',
    'keepsake', 'rare', '🎟', 50
  ),
  (
    'Peta Sektor Cerita',
    'Story Sector Map',
    'Peta kasar semesta cerita. Enam sektor sudah terlihat, tetapi beberapa area masih kosong—seolah menunggu Riku untuk menemukannya.',
    'A rough map of the story universe. Six sectors are visible, but some areas are still blank—as if waiting for Riku to find them.',
    'map', 'uncommon', '🗺', 60
  ),
  (
    'Lentera Mercusuar',
    'Lighthouse Lantern',
    'Lentera kecil yang dibuat dari cerita Kanna tentang anjing di tepi laut. Cahayanya tidak menerangi jalan—ia hanya memastikan seseorang tahu bahwa ia tidak menunggu sendirian.',
    'A small lantern made from Kanna''s story about the dog by the sea. Its light does not show the way—it only makes sure someone knows they are not waiting alone.',
    'artifact', 'epic', '☼', 70
  ),
  (
    'Pita Gema',
    'Echo Ribbon',
    'Pita tipis yang menandai cerita gema pertama Riku. Warnanya berubah mengikuti perasaan orang yang membacanya: rose-gold untuk berani, sage untuk tenang.',
    'A thin ribbon marking Riku''s first echo story. Its color changes with the feelings of whoever reads it: rose-gold for courage, sage for calm.',
    'keepsake', 'rare', '≈', 80
  ),
  (
    'Bintang Kanna',
    'Kanna''s Star',
    'Bintang oshi pertama yang menyala saat Riku memutuskan untuk menjaga cerita Kanna dari awal sampai akhir. Bintang ini tidak pernah redup.',
    'The first oshi star, lit when Riku decided to keep Kanna''s story from beginning to end. This star never dims.',
    'keepsake', 'legendary', '★', 90
  )
) as v(name_id, name_en, description_id, description_en, category, rarity, icon, sort_order)
where not exists (select 1 from public.vn_inventory);
