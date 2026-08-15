// ===================================================
// Dr. Clear Aligner - Supabase Client
// Database and storage access layer
// ===================================================

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Patients ----

/**
 * Patients data access object.
 * Handles all CRUD operations for the `patients` table.
 */
const Patients = {
  /** Fetch all patients, ordered by most recently created. */
  async getAll() {
    const { data, error } = await db
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  /** Fetch a single patient by ID, including all related assessments. */
  async getById(id) {
    const { data, error } = await db
      .from('patients')
      .select('*, assessments(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  /** Create a new patient record. */
  async create(patient) {
    const { data, error } = await db
      .from('patients')
      .insert(patient)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Update an existing patient record by ID. */
  async update(id, patient) {
    const { data, error } = await db
      .from('patients')
      .update(patient)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Search patients by name or phone number (case-insensitive). */
  async search(query) {
    const { data, error } = await db
      .from('patients')
      .select('*')
      .or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  /** Return the total number of patient records. */
  async getStats() {
    const { count } = await db
      .from('patients')
      .select('*', { count: 'exact', head: true });
    return count;
  }
};

// ---- Assessments ----

/**
 * Assessments data access object.
 * Handles all operations for the `assessments` table.
 */
const Assessments = {
  /** Create a new assessment record. */
  async create(assessment) {
    const { data, error } = await db
      .from('assessments')
      .insert(assessment)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Fetch all assessments for a specific patient, newest first. */
  async getByPatient(patientId) {
    const { data, error } = await db
      .from('assessments')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  /** Fetch the most recent assessments, joined with patient name and phone. */
  async getRecent(limit = 10) {
    const { data, error } = await db
      .from('assessments')
      .select('*, patients(name, phone)')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  /** Return total assessment count and today's count. */
  async getStats() {
    const today = new Date().toISOString().split('T')[0];
    const { count: total } = await db
      .from('assessments')
      .select('*', { count: 'exact', head: true });
    const { count: todayCount } = await db
      .from('assessments')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today);
    return { total, today: todayCount };
  }
};

// ---- Knowledge Files ----

/**
 * KnowledgeFiles data access object.
 * Manages uploaded reference documents in the `knowledge_files` table.
 */
const KnowledgeFiles = {
  /** Fetch all knowledge files, newest first. */
  async getAll() {
    const { data, error } = await db
      .from('knowledge_files')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  /** Upload a new knowledge file record. */
  async create(file) {
    const { data, error } = await db
      .from('knowledge_files')
      .insert(file)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Delete a knowledge file record by ID. */
  async delete(id) {
    const { error } = await db.from('knowledge_files').delete().eq('id', id);
    if (error) throw error;
  }
};

// ---- Storage ----

/**
 * Storage helper for uploading dental photos to Supabase Storage.
 */
const Storage = {
  /**
   * Upload a file to the dental-photos bucket.
   * @param {File} file - The file object to upload.
   * @param {string} path - The destination path inside the bucket.
   * @returns {string} Public URL of the uploaded file.
   */
  async upload(file, path) {
    const { data, error } = await db.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: urlData } = db.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path);
    return urlData.publicUrl;
  }
};
