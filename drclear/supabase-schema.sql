-- ===================================================
-- Dr. Clear Aligner - Supabase Schema
-- รันใน Supabase Dashboard > SQL Editor
-- ===================================================

-- เปิดใช้งาน UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ตารางข้อมูลลูกค้า
CREATE TABLE IF NOT EXISTS patients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  phone VARCHAR(50),
  email VARCHAR(255),
  gender VARCHAR(10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางบันทึกการประเมิน
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  -- รูปภาพ 6 มุม (URL จาก Supabase Storage)
  photo_front_closed TEXT,
  photo_front_open TEXT,
  photo_left TEXT,
  photo_right TEXT,
  photo_top TEXT,
  photo_bottom TEXT,
  -- ผลการประเมิน
  conditions JSONB DEFAULT '[]',           -- รายการปัญหาที่พบ
  treatment_plan JSONB DEFAULT '[]',       -- แผนการรักษา
  report_text TEXT,                        -- รายงานข้อความ
  aligner_suitable BOOLEAN DEFAULT false,  -- เหมาะกับ Clear Aligner หรือไม่
  aligner_complexity VARCHAR(50),          -- ง่าย/กลาง/ซับซ้อน
  estimated_duration VARCHAR(100),         -- ระยะเวลาโดยประมาณ
  dentist_notes TEXT,                      -- หมายเหตุของทันตแพทย์
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางไฟล์ความรู้
CREATE TABLE IF NOT EXISTS knowledge_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- เปิด Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_files ENABLE ROW LEVEL SECURITY;

-- อนุญาตทุก operation (ไม่ใช้ Auth ในเวอร์ชันนี้)
CREATE POLICY "Allow all on patients" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on assessments" ON assessments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on knowledge_files" ON knowledge_files FOR ALL USING (true) WITH CHECK (true);

-- สร้าง Storage Bucket สำหรับรูปภาพ
INSERT INTO storage.buckets (id, name, public) VALUES ('dental-photos', 'dental-photos', true)
ON CONFLICT DO NOTHING;

-- อนุญาตอัปโหลดรูปภาพ
CREATE POLICY "Allow uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'dental-photos');
CREATE POLICY "Allow public read" ON storage.objects FOR SELECT USING (bucket_id = 'dental-photos');
CREATE POLICY "Allow delete" ON storage.objects FOR DELETE USING (bucket_id = 'dental-photos');

-- Index สำหรับค้นหาเร็วขึ้น
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);
CREATE INDEX IF NOT EXISTS idx_assessments_patient ON assessments(patient_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created ON assessments(created_at DESC);
