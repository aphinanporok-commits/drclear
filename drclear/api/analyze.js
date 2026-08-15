// ===================================================
// Dr. Clear Aligner - AI Dental Photo Analysis
// Vercel Serverless Function
// Proxies dental photo analysis requests to Google Gemini API (free tier).
// Set GEMINI_API_KEY in Vercel Environment Variables.
// Get a free key at: https://aistudio.google.com/app/apikey
// ===================================================

const CONDITION_LIST = `
ORTHODONTIC CONDITIONS:
- crowding: Teeth overlapping or crooked (ฟันเก)
- spacing: Gaps between teeth (ฟันห่าง)
- overbite: Upper teeth cover lower teeth excessively (ฟันเหยิน)
- underbite: Lower teeth protrude past upper teeth (ฟันล่างยื่น)
- crossbite: Upper and lower teeth don't align properly side to side (สบฟันคร่อม)
- openbite: Front teeth don't meet when biting (ฟันสบเปิด)
- protrusion: Front teeth stick out too far (ฟันยื่น)
- midline: Center of upper and lower teeth don't align (เส้นกึ่งกลางไม่ตรง)
- procline: Teeth tilted forward (ฟัน Procline)

GENERAL CONDITIONS (require pre-treatment):
- tooth_decay_mild: Visible mild tooth decay or cavities (ฟันผุเล็กน้อย)
- tooth_decay_severe: Severe decay or broken teeth (ฟันผุรุนแรง)
- scaling_needed: Visible tartar/calculus buildup on teeth (มีหินปูน)
- missing_tooth: One or more missing teeth (ฟันหายไป)
- impacted_wisdom: Visible impacted or partially erupted wisdom teeth (ฟันคุด)

COSMETIC:
- veneer_candidate: Discolored, chipped, or uneven teeth needing veneers
- crown_needed: Severely damaged teeth needing crowns
- whitening_needed: Noticeably yellow or stained teeth
`;

export default async function handler(req, res) {
  // Allow requests from same origin (Vercel deployment)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured in Vercel environment variables. Get a free key at https://aistudio.google.com/app/apikey' });
  }

  const { images, knowledgeContext } = req.body;
  if (!images || images.length === 0) {
    return res.status(400).json({ error: 'No images provided.' });
  }

  // Build Gemini content parts: images + analysis prompt
  const imageParts = images.map(img => ({
    inlineData: {
      mimeType: img.mediaType || 'image/jpeg',
      data: img.data
    }
  }));

  const knowledgeSection = knowledgeContext
    ? `\nCLINIC KNOWLEDGE BASE (ใช้ข้อมูลนี้ประกอบการประเมิน):\n${knowledgeContext}\n`
    : '';

  const promptPart = {
    text: `You are an expert dental assessment AI for Dr. Clear Aligner clinic in Thailand. Analyze these ${images.length} dental photo(s) thoroughly and identify ALL visible conditions.

${CONDITION_LIST}
${knowledgeSection}
Instructions:
1. ตรวจสอบรูปถ่ายแต่ละรูปอย่างละเอียด — ดูการเรียงตัวของฟัน ช่องว่าง การซ้อนกัน ตำแหน่งของขากรรไกร สีฟัน และหินปูน
2. รวมทุกปัญหาที่มองเห็นได้อย่างสมเหตุสมผล — อย่าข้ามปัญหาที่มองเห็นได้ชัดเจน
3. ฟันมักมีปัญหาหลายอย่างพร้อมกัน (เช่น ฟันเกและฟันเหลือง) ให้ระบุทั้งหมด
4. Confidence: "high" = เห็นชัดเจน, "medium" = น่าจะมี, "low" = ภาพไม่ชัดหรือไม่แน่ใจ
5. Return ONLY a valid JSON object — no explanation, no markdown:

{
  "detected": ["condition_id_1", "condition_id_2"],
  "confidence": "high" | "medium" | "low",
  "notes": "สรุปสั้นๆ เป็นภาษาไทย"
}

สำคัญ: ถ้าเห็นฟันเก ฟันห่าง หรือปัญหาอื่นในรูป ให้ระบุใน detected เสมอ`
  };

  try {
    // Use gemini-3.5-flash — free tier, latest, supports vision
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [...imageParts, promptPart]
          }],
          generationConfig: {
            maxOutputTokens: 512,
            temperature: 0.3  // Balanced — accurate but not overly conservative
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('Gemini API error:', errText);
      return res.status(502).json({ error: 'AI service error: ' + errText.slice(0, 200) });
    }

    const result = await geminiResponse.json();
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    // Parse JSON from Gemini's response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { detected: [], confidence: 'low', notes: '' };

    return res.status(200).json({
      detected: parsed.detected || [],
      confidence: parsed.confidence || 'low',
      notes: parsed.notes || ''
    });

  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Failed to analyze images: ' + err.message });
  }
}
