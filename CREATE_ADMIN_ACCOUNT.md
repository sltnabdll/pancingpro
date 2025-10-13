# Cara Membuat Akun Admin

## Langkah 1: Daftar Akun Admin
1. Buka halaman `/auth` 
2. Klik tab "Daftar"
3. Isi form dengan data berikut:
   - **Nama Lengkap**: Administrator
   - **Nomor Telepon**: 081234567890
   - **Email**: admin@pancingpro.com
   - **Password**: admin1234
4. Klik tombol "Daftar"

## Langkah 2: Konfirmasi Email (Opsional)
Jika email confirmation diaktifkan di Supabase, Anda perlu:
- Cek email admin@pancingpro.com untuk link konfirmasi
- **ATAU** nonaktifkan email confirmation di Supabase:
  1. Buka [Authentication Settings](https://supabase.com/dashboard/project/grctqmsohwqbhtljumbq/auth/providers)
  2. Scroll ke bawah ke "Email Auth"
  3. Matikan "Confirm email"

## Langkah 3: Tambahkan Role Admin
Setelah akun terdaftar, jalankan query SQL ini di Supabase SQL Editor:

```sql
-- Cari user_id dari admin yang baru didaftarkan
SELECT id, email FROM auth.users WHERE email = 'admin@pancingpro.com';

-- Ganti 'USER_ID_DARI_QUERY_DIATAS' dengan ID yang didapat
INSERT INTO user_roles (user_id, role) 
VALUES ('USER_ID_DARI_QUERY_DIATAS', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

**Atau gunakan query gabungan ini:**
```sql
-- Otomatis menambahkan role admin ke user dengan email admin@pancingpro.com
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'admin@pancingpro.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Langkah 4: Login sebagai Admin
1. Buka `/admin/login` untuk halaman login khusus admin
2. Login dengan:
   - **Email**: admin@pancingpro.com
   - **Password**: admin1234
3. Setelah login, Anda akan diarahkan ke Admin Panel

## Akses Admin Panel
- URL Login Admin: `/admin/login`
- URL Admin Panel: `/admin`
- Admin dapat melihat dan approve/reject pesanan dari user

## Troubleshooting
**Jika tidak bisa login sebagai admin:**
1. Pastikan email sudah dikonfirmasi (atau disable email confirmation)
2. Pastikan role admin sudah ditambahkan ke user_roles table
3. Cek apakah ada error di console browser
4. Logout dan login kembali

**Query untuk cek role admin:**
```sql
SELECT u.email, ur.role 
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
WHERE u.email = 'admin@pancingpro.com';
```
