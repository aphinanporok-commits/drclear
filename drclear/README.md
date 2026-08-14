# Dr. Clear Aligner — ระบบประเมินฟันลูกค้า

## คู่มือ Deploy (Supabase + Vercel)

---

## ขั้นตอนที่ 1: ตั้งค่า Supabase

1. ไปที่ https://supabase.com → Sign Up ฟรี
2. กด **New Project** → ตั้งชื่อ เช่น `drclear-db` → เลือก Region: **Southeast Asia (Singapore)**
3. รอสร้างเสร็จ (~1 นาที)
4. ไปที่ **SQL Editor** (เมนูซ้าย) → คลิก **New Query**
5. Copy โค้ดทั้งหมดจากไฟล์ `supabase-schema.sql` → Paste → กด **Run**
6. ไปที่ **Project Settings → API**:
   - Copy `Project URL` → ใส่ใน `js/config.js` ที่ `SUPABASE_URL`
   - Copy `anon public` key → ใส่ใน `js/config.js` ที่ `SUPABASE_ANON_KEY`

---

## ขั้นตอนที่ 2: แก้ไข config.js

เปิดไฟล์ `js/config.js` แล้วแก้ไข:

```javascript
const SUPABASE_URL = 'https://xxxxxxxx.supabase.co';      // ← ใส่ของจริง
const SUPABASE_ANON_KEY = 'eyJhbGci...';                  // ← ใส่ของจริง
```

---

## ขั้นตอนที่ 3: Deploy บน Vercel

### วิธีที่ 1: อัปโหลดโฟลเดอร์โดยตรง (ง่ายที่สุด)
1. ไปที่ https://vercel.com → Sign Up ด้วย Gmail
2. กด **Add New → Project**
3. เลือก **Browse** → อัปโหลดโฟลเดอร์ `drclear` ทั้งหมด
4. กด **Deploy** → รอ ~1 นาที
5. ได้ URL เว็บของคุณ! เช่น `https://drclear.vercel.app`

### วิธีที่ 2: ผ่าน GitHub (แนะนำ - อัปเดตง่าย)
1. สร้าง Repository บน GitHub → อัปโหลดไฟล์ทั้งหมด
2. ที่ Vercel → Import from GitHub → เลือก Repo
3. Deploy อัตโนมัติทุกครั้งที่กด Push

---

## โครงสร้างไฟล์

```
drclear/
├── index.html          ← Dashboard หน้าหลัก
├── assessment.html     ← หน้าประเมินฟัน (4 ขั้นตอน)
├── patients.html       ← รายชื่อลูกค้าทั้งหมด
├── patient-detail.html ← ประวัติลูกค้ารายคน
├── knowledge.html      ← จัดการฐานความรู้
├── vercel.json         ← Config สำหรับ Vercel
├── supabase-schema.sql ← SQL สำหรับสร้างตาราง
├── css/
│   └── style.css       ← Design System Dr. Clear Aligner
└── js/
    ├── config.js        ← ⭐ แก้ไข Supabase credentials ที่นี่
    ├── dental-data.js   ← ฐานความรู้ฟันทั้งหมด (จาก PDF)
    └── supabase-client.js ← Supabase connection
```

---

## ฟีเจอร์ทั้งหมด

- ✅ อัปโหลดรูปฟัน 6 มุม (ด้านหน้า×2, ซ้าย, ขวา, บน, ล่าง)
- ✅ Checklist ปัญหา 17 ประเภท พร้อมคำอธิบาย
- ✅ สร้างรายงานอัตโนมัติ (ภาษาไทย)
- ✅ บอกว่าเหมาะกับ Clear Aligner หรือไม่
- ✅ แจ้งเตือนสิ่งที่ต้องรักษาก่อน
- ✅ บันทึกลง Supabase Database
- ✅ ดูประวัติลูกค้าทั้งหมด
- ✅ เพิ่มไฟล์ความรู้ใหม่ได้ตลอด
- ✅ Print / Export รายงาน

---

## หมายเหตุ

- **Plan Free ของ Supabase** รองรับข้อมูลได้ 500MB และ Storage 1GB เพียงพอสำหรับใช้งานในคลินิก
- หากต้องการเพิ่ม Authentication (Login) สามารถเพิ่มได้ภายหลัง
