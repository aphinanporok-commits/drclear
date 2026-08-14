// ===================================================
// Supabase Client Initialization
// ===================================================

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Patients ----
const Patients = {
  async getAll() {
    const { data, error } = await db.from('patients').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await db.from('patients').select('*, assessments(*)').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(patient) {
    const { data, error } = await db.from('patients').insert(patient).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, patient) {
    const { data, error } = await db.from('patients').update(patient).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async search(query) {
    const { data, error } = await db.from('patients')
      .select('*')
      .or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async getStats() {
    const { count } = await db.from('patients').select('*', { count: 'exact', head: true });
    return count;
  }
};

// ---- Assessments ----
const Assessments = {
  async create(assessment) {
    const { data, error } = await db.from('assessments').insert(assessment).select().single();
    if (error) throw error;
    return data;
  },
  async getByPatient(patientId) {
    const { data, error } = await db.from('assessments')
      .select('*').eq('patient_id', patientId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async getRecent(limit = 10) {
    const { data, error } = await db.from('assessments')
      .select('*, patients(name, phone)').order('created_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return data;
  },
  async getStats() {
    const today = new Date().toISOString().split('T')[0];
    const { count: total } = await db.from('assessments').select('*', { count: 'exact', head: true });
    const { count: todayCount } = await db.from('assessments')
      .select('*', { count: 'exact', head: true }).gte('created_at', today);
    return { total, today: todayCount };
  }
};

// ---- Knowledge Files ----
const KnowledgeFiles = {
  async getAll() {
    const { data, error } = await db.from('knowledge_files').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async create(file) {
    const { data, error } = await db.from('knowledge_files').insert(file).select().single();
    if (error) throw error;
    return data;
  },
  async delete(id) {
    const { error } = await db.from('knowledge_files').delete().eq('id', id);
    if (error) throw error;
  }
};

// ---- Storage (Photos) ----
const Storage = {
  async upload(file, path) {
    const { data, error } = await db.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: urlData } = db.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return urlData.publicUrl;
  }
};
