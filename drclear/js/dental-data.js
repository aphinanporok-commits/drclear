// ===================================================
// Dr. Clear Aligner - Dental Knowledge Base
// Extracted from DentalKnowledge reference document.
// UI labels are in Thai; all code logic is in English.
// ===================================================

/**
 * DENTAL_DATA — structured knowledge base for dental conditions.
 * Organised into three categories:
 *   - orthodontic : alignment & bite issues suitable for Clear Aligner
 *   - general     : conditions requiring pre-treatment before orthodontics
 *   - cosmetic    : aesthetic treatments
 */
const DENTAL_DATA = {

  // ── Orthodontic Conditions ──────────────────────────
  orthodontic: [
    {
      id: 'crowding',
      name: 'ฟันเก (Crowding)',
      nameEn: 'Crowding',
      icon: '🦷',
      description: 'ฟันที่ขึ้นมาแล้วไม่ได้อยู่ในตำแหน่งที่เป็นปกติ อาจจะขึ้นซ้อนกัน หรือเกยกัน เกิดจากฟันมีขนาดใหญ่เกินไปเมื่อเทียบกับขนาดของขากรรไกร',
      severity: ['เล็กน้อย (1-3 มม.)', 'ปานกลาง (3-5 มม.)', 'รุนแรง (>5 มม.)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'เหมาะสำหรับทุกระดับ' },
        { name: 'IPR (การลดขนาดฟันด้านข้าง)', priority: 2, note: 'ใช้ร่วมกับการจัดฟัน' },
        { name: 'Expansion (การขยายฟัน)', priority: 3, note: 'กรณีขากรรไกรแคบ' }
      ],
      aligner_suitable: true,
      duration_estimate: '6-18 เดือน',
      complexity: 'ง่าย-ปานกลาง'
    },
    {
      id: 'spacing',
      name: 'ฟันห่าง (Spacing)',
      nameEn: 'Excessive Spacing',
      icon: '↔️',
      description: 'ปัญหาฟันห่างอาจเกิดจากมีฟันบางซี่หายไป หรือเคยถอนออก หรืออาจเป็นเพียงเรื่องความสวยงาม เส้นกึ่งกลางฟันไม่ตรงกัน อาจก่อให้เกิดปัญหาฟันกราม หรือการบดเคี้ยวที่ไม่ดีได้',
      severity: ['น้อย (<2 มม.)', 'ปานกลาง (2-4 มม.)', 'มาก (>4 มม.)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'ปิดช่องว่างด้วยการเลื่อนฟัน' },
        { name: 'Veneer / Composite', priority: 2, note: 'กรณีห่างเล็กน้อยต้องการผลเร็ว' }
      ],
      aligner_suitable: true,
      duration_estimate: '4-12 เดือน',
      complexity: 'ง่าย-ปานกลาง'
    },
    {
      id: 'overbite',
      name: 'ฟันเหยิน (Overbite / Deep Bite)',
      nameEn: 'Overbite',
      icon: '⬇️',
      description: 'ฟันด้านบนยื่นออกมามากกว่าปกติ อาจทำให้ฟันล่างกัดโดนเพดานปาก ฟันบดกินกันมากเกินไปจนอาจทำให้ฟันล่างสึก',
      severity: ['เล็กน้อย (20-40%)', 'ปานกลาง (40-60%)', 'รุนแรง (>60%)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'ใช้ Bite Ramp ร่วมด้วย' },
        { name: 'Bite Ramp', priority: 2, note: 'ช่วยเปิด Bite ให้ดีขึ้น' }
      ],
      aligner_suitable: true,
      duration_estimate: '12-24 เดือน',
      complexity: 'ปานกลาง-ซับซ้อน'
    },
    {
      id: 'underbite',
      name: 'ฟันล่างยื่น (Underbite)',
      nameEn: 'Underbite',
      icon: '⬆️',
      description: 'ฟันล่างจะยื่นเลยฟันบนออกมา หลายๆ คนชอบเปรียบเทียบว่าเป็นฟันบูลด็อก ฟันล่างยื่นออกมาและบางครั้งอาจมาจากกระดูกขากรรไกรล่างที่ยาวเกินไป',
      severity: ['เล็กน้อย', 'ปานกลาง', 'รุนแรง (อาจต้องผ่าตัด)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'เหมาะสำหรับเคสที่ไม่รุนแรง' },
        { name: 'ผ่าตัดขากรรไกร', priority: 2, note: 'กรณีเกิดจากกระดูกขากรรไกร' }
      ],
      aligner_suitable: true,
      duration_estimate: '12-24 เดือน',
      complexity: 'ปานกลาง-ซับซ้อน'
    },
    {
      id: 'crossbite',
      name: 'สบฟันคร่อม (Crossbite)',
      nameEn: 'Crossbite',
      icon: '✖️',
      description: 'เมื่อกัดฟัน ฟันบนและฟันล่างจะไม่สบกันพอดี แต่จะคร่อม หรือไขว้กัน ฟันหน้าล่างคร่อมฟันหน้าบน อาจทำให้ฟันสึกและกระดูกขากรรไกรเจริญผิดปกติ',
      severity: ['ฟันหน้า', 'ฟันกราม', 'ทั้งหมด'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'พร้อม Expansion หากจำเป็น' },
        { name: 'Expansion (การขยายฟัน)', priority: 2, note: 'ขยายขากรรไกรบน' }
      ],
      aligner_suitable: true,
      duration_estimate: '12-18 เดือน',
      complexity: 'ปานกลาง'
    },
    {
      id: 'openbite',
      name: 'ฟันสบเปิด (Open Bite)',
      nameEn: 'Open Bite',
      icon: '↕️',
      description: 'คือความผิดปกติที่เมื่อกัดฟันหลังแล้วฟันหน้าไม่สามารถกัดกันได้ สาเหตุอาจจากนิสัยชอบดูดนิ้วตอนเด็ก ความผิดปกติของตำแหน่งลิ้น หรือความผิดปกติของกระดูกขากรรไกร',
      severity: ['เล็กน้อย (<2 มม.)', 'ปานกลาง (2-4 มม.)', 'รุนแรง (>4 มม.)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'ร่วมกับการฝึกลิ้น' },
        { name: 'แก้ไขนิสัย (Habit Correction)', priority: 2, note: 'กรณีเกิดจากนิสัย' }
      ],
      aligner_suitable: true,
      duration_estimate: '18-30 เดือน',
      complexity: 'ซับซ้อน'
    },
    {
      id: 'protrusion',
      name: 'ฟันยื่น (Protrusion / Overjet)',
      nameEn: 'Overjet / Protrusion',
      icon: '➡️',
      description: 'ฟันหน้าบนหรือฟันหน้าล่างยื่นออกมามากกว่าปกติ ทำให้ปากอูม บางคนไม่สามารถปิดริมฝีปากได้สนิท มีฟันหน้าออกมา ทำให้เสียบุคลิกภาพ เสี่ยงที่ฟันหน้าจะบิ่นหรือหักจากอุบัติเหตุ',
      severity: ['เล็กน้อย (<4 มม.)', 'ปานกลาง (4-7 มม.)', 'รุนแรง (>7 มม.)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'พร้อม IPR หรือ Distalization' },
        { name: 'IPR', priority: 2, note: 'สร้างพื้นที่ให้ฟันถอยร่น' },
        { name: 'Distalization (ดันฟันกรามไปด้านหลัง)', priority: 3, note: 'เพิ่มพื้นที่สำหรับฟันหน้า' }
      ],
      aligner_suitable: true,
      duration_estimate: '12-24 เดือน',
      complexity: 'ปานกลาง-ซับซ้อน'
    },
    {
      id: 'midline',
      name: 'เส้นกึ่งกลางฟันไม่ตรง (Midline Discrepancy)',
      nameEn: 'Midline',
      icon: '⚖️',
      description: 'เส้นกึ่งกลางของฟันบนและล่างไม่ตรงกัน อาจส่งผลต่อความสวยงามและการบดเคี้ยว',
      severity: ['น้อย (<2 มม.)', 'ปานกลาง (2-4 มม.)', 'มาก (>4 มม.)'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'ปรับเส้นกึ่งกลางด้วยการเลื่อนฟัน' }
      ],
      aligner_suitable: true,
      duration_estimate: '6-12 เดือน',
      complexity: 'ง่าย-ปานกลาง'
    },
    {
      id: 'procline',
      name: 'ฟัน Procline (ฟันเอียงออกด้านหน้า)',
      nameEn: 'Proclination',
      icon: '🔄',
      description: 'ฟันบนหรือฟันล่างเอียงออกไปด้านหน้า ทำให้ริมฝีปากยื่นออกมา เป็นค่าศัพท์ทางทันตกรรมที่ใช้เมื่อฟันทั้งบนและล่างทำมุมไปข้างหน้า',
      severity: ['เล็กน้อย', 'ปานกลาง', 'รุนแรง'],
      treatments: [
        { name: 'จัดฟันใส Clear Aligner', priority: 1, note: 'ร่วมกับ IPR หรือ Retraction' }
      ],
      aligner_suitable: true,
      duration_estimate: '12-18 เดือน',
      complexity: 'ปานกลาง'
    }
  ],

  // ── General / Pre-treatment Conditions ─────────────
  general: [
    {
      id: 'tooth_decay_mild',
      name: 'ฟันผุ - เล็กน้อย (Tooth Decay)',
      nameEn: 'Tooth Decay (Mild)',
      icon: '🔴',
      description: 'ฟันได้รับความเสียหายจากแบคทีเรียในระยะแรก ยังไม่ลึกถึงโพรงประสาทฟัน ต้องรักษาก่อนจัดฟัน',
      treatments: [
        { name: 'อุดฟัน (Composite Filling)', priority: 1, note: 'ต้องทำก่อนเริ่มจัดฟัน' }
      ],
      aligner_suitable: false,
      pre_treatment_required: true,
      pre_treatment_note: '⚠️ ต้องอุดฟันก่อนเริ่มจัดฟันใส'
    },
    {
      id: 'tooth_decay_severe',
      name: 'ฟันผุลึก - รุนแรง (Deep Caries)',
      nameEn: 'Deep Caries',
      icon: '🔴',
      description: 'ฟันผุลึกถึงโพรงประสาทฟัน อาจมีการติดเชื้อ ต้องรักษารากฟันก่อน',
      treatments: [
        { name: 'รักษารากฟัน (Root Canal)', priority: 1, note: 'ต้องทำก่อนเริ่มจัดฟัน' },
        { name: 'ครอบฟัน (Crown)', priority: 2, note: 'หลังรักษารากฟัน' }
      ],
      aligner_suitable: false,
      pre_treatment_required: true,
      pre_treatment_note: '⚠️ ต้องรักษารากฟันก่อนเริ่มจัดฟันใส'
    },
    {
      id: 'scaling_needed',
      name: 'มีหินปูน (Scaling Needed)',
      nameEn: 'Scaling Required',
      icon: '🟡',
      description: 'มีหินปูน (Calculus) สะสมบริเวณรากฟัน ต้องขูดออกก่อนเริ่มจัดฟัน เพื่อสุขภาพเหงือกที่ดี',
      treatments: [
        { name: 'ขูดหินปูนและขัดฟัน (Scaling & Polishing)', priority: 1, note: 'ต้องทำก่อนเริ่มจัดฟัน' }
      ],
      aligner_suitable: false,
      pre_treatment_required: true,
      pre_treatment_note: '⚠️ ต้องขูดหินปูนก่อนเริ่มจัดฟันใส'
    },
    {
      id: 'missing_tooth',
      name: 'ฟันหายไป (Missing Tooth)',
      nameEn: 'Missing Tooth',
      icon: '⬜',
      description: 'มีฟันที่หายไปจากช่องปาก อาจเกิดจากการถอนหรือไม่เคยขึ้น ต้องพิจารณาร่วมกับแผนการจัดฟัน',
      treatments: [
        { name: 'รากเทียม (Dental Implant)', priority: 1, note: 'หลังจัดฟันเสร็จ' },
        { name: 'สะพานฟัน (Dental Bridge)', priority: 2, note: 'ทางเลือกอื่น' },
        { name: 'ปิดช่องว่างด้วย Clear Aligner', priority: 3, note: 'กรณีช่องว่างเล็ก' }
      ],
      aligner_suitable: true,
      pre_treatment_note: 'ℹ️ วางแผนร่วมกับทันตแพทย์'
    },
    {
      id: 'impacted_wisdom',
      name: 'ฟันคุด (Impacted Wisdom Tooth)',
      nameEn: 'Impacted Wisdom Tooth',
      icon: '🦴',
      description: 'ฟันที่ไม่สามารถขึ้นมาในช่องปากได้ตามปกติ เนื่องจากไม่มีที่พอหรือมีสิ่งขัดขวาง ควรพิจารณาถอนก่อนจัดฟัน',
      treatments: [
        { name: 'ถอนฟันคุด', priority: 1, note: 'แนะนำให้ถอนก่อนเริ่มจัดฟัน' }
      ],
      aligner_suitable: false,
      pre_treatment_note: '⚠️ แนะนำถอนฟันคุดก่อนเริ่มจัดฟัน'
    }
  ],

  // ── Cosmetic Treatments ─────────────────────────────
  cosmetic: [
    {
      id: 'veneer_candidate',
      name: 'เหมาะกับ Veneer',
      nameEn: 'Veneer Candidate',
      icon: '✨',
      description: 'ฟันที่มีสีเหลือง รอยร้าว หรือต้องการปรับรูปร่าง Veneer คือแผ่นบางๆ ของพอร์ซเลนหรือคอมโพสิตที่ยึดกับฟัน',
      treatments: [
        { name: 'Veneer คอมโพสิต', priority: 1, note: 'ราคาประหยัด อายุ 5-7 ปี' },
        { name: 'Veneer พอร์ซเลน', priority: 2, note: 'ทนทาน สวย อายุ 15-20 ปี' }
      ],
      aligner_suitable: false
    },
    {
      id: 'crown_needed',
      name: 'ต้องครอบฟัน (Crown)',
      nameEn: 'Crown Needed',
      icon: '👑',
      description: 'ฟันที่แตกหักหรือเสียหายมาก ต้องครอบฟันเพื่อเสริมความแข็งแรงและความสวยงาม',
      treatments: [
        { name: 'ครอบฟัน (Dental Crown)', priority: 1, note: 'รักษารูปทรงและความแข็งแรงของฟัน' }
      ],
      aligner_suitable: false
    },
    {
      id: 'whitening_needed',
      name: 'ต้องฟอกสีฟัน',
      nameEn: 'Whitening Needed',
      icon: '⚪',
      description: 'ฟันมีสีเหลืองหรือคล้ำ ต้องการฟอกสีให้ขาวขึ้น',
      treatments: [
        { name: 'ฟอกสีฟัน (Teeth Whitening)', priority: 1, note: 'ทำก่อนหรือหลังจัดฟันก็ได้' }
      ],
      aligner_suitable: false
    }
  ]
};

// ── Report Generator ────────────────────────────────

/**
 * Generate a Thai-language assessment report from selected condition IDs.
 *
 * @param {string}   patientName         - Patient's full name.
 * @param {string[]} selectedConditionIds - Array of condition IDs from DENTAL_DATA.
 * @param {string}   [dentistNotes='']   - Optional free-text notes from the dentist.
 * @returns {{ report: string, alignerSuitable: boolean, treatments: object[], preRequired: string[] }}
 */
function generateAssessmentReport(patientName, selectedConditionIds, dentistNotes = '') {
  const allConditions = [
    ...DENTAL_DATA.orthodontic,
    ...DENTAL_DATA.general,
    ...DENTAL_DATA.cosmetic
  ];

  const selected      = selectedConditionIds.map(id => allConditions.find(c => c.id === id)).filter(Boolean);
  const orthodontic   = selected.filter(c => DENTAL_DATA.orthodontic.find(d => d.id === c.id));
  const cosmetic      = selected.filter(c => DENTAL_DATA.cosmetic.find(d => d.id === c.id));
  const preRequired   = selected.filter(c => c.pre_treatment_required);

  // Patient is suitable for Clear Aligner only when there are orthodontic issues
  // and no conditions requiring pre-treatment.
  const alignerSuitable = orthodontic.length > 0 && preRequired.length === 0;

  const today = new Date().toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // ── Build report text ──
  let report = `รายงานการประเมินสภาวะฟัน\n`;
  report += `${'='.repeat(40)}\n`;
  report += `ชื่อผู้ป่วย: ${patientName}\n`;
  report += `วันที่ประเมิน: ${today}\n`;
  report += `${'='.repeat(40)}\n\n`;

  if (selected.length === 0) {
    report += `ผลการประเมิน: ไม่พบปัญหาที่ต้องรักษาเพิ่มเติม\n`;
    report += `สุขภาพช่องปากอยู่ในเกณฑ์ดี\n`;
    return { report, alignerSuitable: false, treatments: [], preRequired: [] };
  }

  // Section 1 — Conditions found
  report += `📋 ปัญหาที่พบ\n${'─'.repeat(30)}\n`;
  selected.forEach((c, i) => {
    report += `${i + 1}. ${c.name}\n`;
    report += `   ${c.description}\n`;
    if (c.pre_treatment_note) report += `   ${c.pre_treatment_note}\n`;
    report += '\n';
  });

  // Section 2 — Pre-treatment requirements
  if (preRequired.length > 0) {
    report += `⚠️ สิ่งที่ต้องรักษาก่อนจัดฟัน\n${'─'.repeat(30)}\n`;
    preRequired.forEach(c => {
      report += `• ${c.name}: ${c.treatments[0].name}\n`;
    });
    report += '\n';
  }

  // Section 3 — Orthodontic plan
  if (orthodontic.length > 0) {
    report += `🦷 แผนการจัดฟัน\n${'─'.repeat(30)}\n`;
    if (alignerSuitable) {
      report += `✅ เหมาะสมกับการจัดฟันใส (Clear Aligner)\n\n`;
      orthodontic.forEach(c => {
        report += `• ${c.name}\n`;
        report += `  แนวทาง: ${c.treatments.map(t => t.name).join(', ')}\n`;
        report += `  ระยะเวลาโดยประมาณ: ${c.duration_estimate}\n\n`;
      });
    } else {
      report += `⚠️ ต้องรักษาปัญหาอื่นก่อน จึงจะเริ่มจัดฟันได้\n\n`;
    }
  }

  // Section 4 — Cosmetic treatments
  if (cosmetic.length > 0) {
    report += `✨ งานความสวยงาม\n${'─'.repeat(30)}\n`;
    cosmetic.forEach(c => {
      report += `• ${c.name}: ${c.treatments.map(t => t.name).join(', ')}\n`;
    });
    report += '\n';
  }

  // Section 5 — Dentist notes
  if (dentistNotes) {
    report += `📝 หมายเหตุจากทันตแพทย์\n${'─'.repeat(30)}\n`;
    report += `${dentistNotes}\n\n`;
  }

  report += `${'='.repeat(40)}\n`;
  report += `** รายงานนี้จัดทำโดย ${CLINIC_NAME} **\n`;
  report += `** ข้อมูลนี้ใช้เพื่อประกอบการตัดสินใจเท่านั้น **\n`;

  return {
    report,
    alignerSuitable,
    treatments: selected.flatMap(c => c.treatments),
    preRequired: preRequired.map(c => c.pre_treatment_note)
  };
}
