const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// السماح للموقع بالاتصال بالـ Backend
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// الصفحة الرئيسية للـ Backend
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VIZORA AI Backend is running 🚀"
  });
});

// توليد الفيديو
app.post("/api/generate-video", async (req, res) => {
  try {
    const {
      idea,
      ratio,
      duration,
      language,
      voice,
      style
    } = req.body;

    // التحقق من البيانات
    if (!idea || !idea.trim()) {
      return res.status(400).json({
        success: false,
        error: "اكتب فكرة الفيديو أولاً"
      });
    }

    if (idea.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "فكرة الفيديو طويلة جدًا"
      });
    }

    // البيانات التي وصلت من VIZORA
    const videoRequest = {
      idea: idea.trim(),
      ratio: ratio || "9:16",
      duration: Number(duration) || 15,
      language: language || "ar",
      voice: voice || "none",
      style: style || "cinematic"
    };

    console.log("New VIZORA video request:");
    console.log(videoRequest);

    /*
      ==================================================
      هنا سنضع كود خدمة توليد الفيديو الحقيقية.
      ==================================================

      مهم:
      لا تضع API KEY داخل create.html.

      المفتاح السري سيكون في:
      process.env.VIDEO_API_KEY

      وبعد اختيار خدمة توليد الفيديو سنربطها هنا.
    */

    return res.status(200).json({
      success: false,
      status: "not_connected",
      message:
        "تم استلام طلب الفيديو بنجاح، لكن خدمة توليد الفيديو لم يتم ربطها بعد.",
      request: videoRequest
    });

  } catch (error) {
    console.error("VIZORA ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "حدث خطأ في الخادم"
    });
  }
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`VIZORA AI Backend running on port ${PORT}`);
});
