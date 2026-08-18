// ===================================================
// Dr. Clear Aligner - AI Dental Photo Screening
// Vercel Serverless Function → Google Gemini API (free)
// Set GEMINI_API_KEY in Vercel Environment Variables.
// ===================================================

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured.' });
  }

  const { images, knowledgeContext } = req.body;
  if (!images || images.length === 0) {
    return res.status(400).json({ error: 'No images provided.' });
  }

  const imageParts = images.map(img => ({
    inlineData: { mimeType: img.mediaType || 'image/jpeg', data: img.data }
  }));

  const knowledgeSection = knowledgeContext
    ? `\nข้อมูลเพิ่มเติมจากคลินิก:\n${knowledgeContext}\n`
    : '';

  // Simple, direct screening prompt — goal is rough categorization for patient awareness
  const prompt = `คุณเป็น AI ช่วยคัดกรองปัญหาฟันเบื้องต้น (dental screening) สำหรับ Dr. Clear Aligner คลินิก
ดูรูปถ่ายฟัน ${images.length} รูปแล้วระบุว่าเห็นปัญหาอะไรบ้างในรูป${knowledgeSection}

รหัสปัญหาที่ต้องระบุ (ใส่ทุกอันที่มองเห็นได้แม้จะไม่ชัดมาก):

การจัดเรียงฟัน:
- crowding = ฟันซ้อนกัน / หมุน / ไม่เป็นระเบียบ
- spacing = มีช่องว่างระหว่างฟัน
- overbite = ฟันบนปิดทับฟันล่างมากกว่าปกติ
- underbite = ฟันล่างยื่นออกมาหน้าฟันบน
- crossbite = ฟันบนและล่างสบกันผิดที่
- openbite = ฟันหน้าไม่สบกันตอนปิดปาก
- protrusion = ฟันหน้ายื่นออกมาก
- midline = แนวกึ่งกลางฟันบน-ล่างไม่ตรงกัน
- procline = ฟันเอียงไปด้านหน้า

สุขภาพฟัน:
- tooth_decay_mild = มีคราบดำ/น้ำตาลบนฟัน
- tooth_decay_severe = ฟันผุรุนแรง/แตกหัก
- scaling_needed = มีหินปูน/คราบเหลืองที่โคนฟัน
- missing_tooth = ฟันหายไป
- whitening_needed = ฟันเหลืองหรือมีคราบ

นอกจากนี้ให้ประเมิน สุขภาพช่องปากโดยรวม (oral_health) จากสิ่งที่มองเห็นในรูป:
- score: "ดี" = ช่องปากสะอาด ไม่มีคราบหินปูน ไม่มีฟันผุ เหงือกดูแข็งแรง
- score: "พอใช้" = มีบัญหาเล็กน้อย เช่น คราบเล็กน้อย หรือฟันซ้อนเล็กน้อย แต่ยังไม่รุนแรง
- score: "ควรรักษาก่อน" = มีหินปูนมาก ฟันผุ เหงือกอักเสบ หรือปัญหาที่ต้องรักษาก่อนจัดฟัน
- summary: อธิบายสั้นๆ ว่าเห็นอะไรในช่องปากโดยรวม (ภาษาไทย 1-2 ประโยค)
- tips: คำแนะนำดูแลช่องปากเบื้องต้น 2-3 ข้อ (array ภาษาไทย)

และให้ประเมิน ความเป็นไปได้ในการผ่าตัดกราม (jaw_surgery) เบื้องต้นจากสิ่งที่มองเห็นในรูป:
- likelihood: "ไม่น่าจำเป็น" = โครงสร้างกรามและฟันดูปกติ ไม่มีสัญญาณชัดเจน
- likelihood: "อาจจำเป็น" = มีสัญญาณบางอย่างที่ควรได้รับการประเมินจากทันตแพทย์เพิ่มเติม เช่น underbite เล็กน้อย, ความไม่สมมาตรของใบหน้า, overbite มาก
- likelihood: "น่าจำเป็น" = มีสัญญาณชัดเจนที่บ่งชี้ว่าการจัดฟันอย่างเดียวอาจไม่เพียงพอ เช่น underbite/overbite รุนแรง, crossbite กว้าง, ความไม่สมมาตรรุนแรง, facial profile ผิดปกติมาก
- signs: รายการสัญญาณที่สังเกตเห็น (array ภาษาไทย เช่น ["ฟันล่างยื่นเกินฟันบนมาก", "ความไม่สมมาตรของใบหน้า"])
- reason: อธิบายสั้นๆ เหตุผลที่ประเมิน (ภาษาไทย 1-2 ประโยค)
หมายเหตุ: นี่เป็นการคัดกรองเบื้องต้นจากรูปถ่ายเท่านั้น ไม่ใช่การวินิจฉัย ต้องตรวจโดยทันตแพทย์เฉพาะทาง

ตอบเฉพาะ JSON นี้เท่านั้น ห้ามมีข้อความอื่น:
{"detected":["id1","id2"],"confidence":"high","notes":"สิ่งที่สังเกตเห็นในรูปเป็นภาษาไทย","oral_health":{"score":"พอใช้","summary":"อธิบายสุขภาพช่องปากโดยรวม","tips":["คำแนะนำ 1","คำแนะนำ 2"]},"jaw_surgery":{"likelihood":"อาจจำเป็น","signs":["สัญญาณที่พบ"],"reason":"เหตุผลสั้นๆ"}}

หมายเหตุ: นี่เป็นการคัดกรองเบื้องต้น ไม่ใช่การวินิจฉัย — ให้ระบุทุกอย่างที่มองเห็นได้`;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  try {
    const payload = JSON.stringify({
      contents: [{ parts: [...imageParts, { text: prompt }] }],
      generationConfig: { maxOutputTokens: 4096, temperature: 0.4, thinkingConfig: { thinkingBudget: 0 } }
    });

    // Retry up to 3 times on 503 / 429 (high demand / rate limit)
    let geminiResponse, errText;
    for (let attempt = 1; attempt <= 3; attempt++) {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload }
      );
      if (geminiResponse.ok) break;
      errText = await geminiResponse.text();
      const status = geminiResponse.status;
      if ((status === 503 || status === 429) && attempt < 3) {
        console.warn(`Gemini ${status} on attempt ${attempt}, retrying in ${attempt * 3}s...`);
        await sleep(attempt * 3000);
      } else break;
    }

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', errText);
      return res.status(502).json({ error: 'AI service error: ' + (errText || '').slice(0, 200) });
    }

    const result = await geminiResponse.json();
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    console.log('Gemini raw response:', rawText);

    // Extract JSON — strip markdown code blocks, use greedy match
    const stripped = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
    const jsonMatch = stripped.match(/\{[\s\S]*\}/);  // greedy
    let parsed = { detected: [], confidence: 'low', notes: '' };
    if (jsonMatch) {
      try { parsed = JSON.parse(jsonMatch[0]); } catch(e) { console.error('JSON parse error:', e, jsonMatch[0]); }
    }

    return res.status(200).json({
      detected: Array.isArray(parsed.detected) ? parsed.detected : [],
      confidence: parsed.confidence || 'medium',
      notes: parsed.notes || '',
      oral_health: parsed.oral_health || null,
      jaw_surgery: parsed.jaw_surgery || null
    });

  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Failed to analyze: ' + err.message });
  }
}
