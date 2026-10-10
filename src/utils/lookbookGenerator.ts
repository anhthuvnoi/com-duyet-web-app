/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outfit } from "../data/outfits";
import { TraditionalColor } from "../data/colors";
import { CityWeather } from "../data/weather";
import { StylingLevelInfo } from "../data/accessories";
import { ValidationResult } from "./culturalValidationEngine";
import { CurrentOutfitState } from "../data/wardrobe";

export interface LookbookExportParams {
  outfit: Outfit;
  currentOutfit?: CurrentOutfitState | null;
  capturedDollImage?: string | null;
  color: TraditionalColor;
  city: CityWeather;
  levelInfo: StylingLevelInfo;
  gender: "nu" | "nam";
  mascotName: string;
  occasion?: string;
  validation?: ValidationResult;
  userNote?: string;
}

export function exportLookbookToImage({
  outfit,
  currentOutfit,
  capturedDollImage,
  color,
  city,
  levelInfo,
  gender,
  mascotName,
  occasion = "Đi học/Kỷ yếu",
  validation,
  userNote
}: LookbookExportParams): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const width = 900;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      resolve("");
      return;
    }

    const currentScore = validation ? validation.score : outfit.score;
    const currentSeal = validation ? validation.seal : "CỐM DUYỆT CHUẨN NẾP";
    const currentFeedback = validation
      ? validation.feedback
      : gender === "nu"
      ? levelInfo.comRemarkNu
      : levelInfo.comRemarkNam;

    // Display outfit name from current equipped items or preset
    const displayTitle =
      currentOutfit?.outer?.name ||
      currentOutfit?.inner?.name ||
      (currentOutfit && Object.values(currentOutfit).some(Boolean)
        ? "Bộ Phối Cổ Phục Tự Do"
        : outfit.name);

    // Tier color scheme
    const tierColor =
      currentScore >= 8.0
        ? "#059669" // emerald
        : currentScore >= 6.0
        ? "#D97706" // amber
        : "#DC2626"; // red

    // 1. Background gradient (Emerald luxury tone)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#064E3B"); // emerald-900
    bgGradient.addColorStop(0.5, "#047857"); // emerald-700
    bgGradient.addColorStop(1, "#022C22"); // emerald-950
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative border
    ctx.strokeStyle = "#FDE68A"; // amber-200
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = "#10B981"; // emerald-500
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Header badge
    ctx.fillStyle = "#FDE68A";
    ctx.font = "bold 20px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ BỘ SƯU TẬP CỔ PHỤC GEN Z ✦", width / 2, 85);

    // Main App Title
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 38px 'Be Vietnam Pro', sans-serif";
    ctx.fillText("CỐM DUYỆT • VIỆT PHỤC REMIX", width / 2, 135);

    ctx.fillStyle = "#A7F3D0";
    ctx.font = "18px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(
      `Kiểm định bởi ${mascotName} • Thang điểm chuẩn 3 mức Cốm Duyệt`,
      width / 2,
      170
    );

    // Outfit card
    const cardX = 60;
    const cardY = 205;
    const cardW = width - 120;
    const cardH = 370;

    // Background card
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 20);
    ctx.fill();

    // Inner top banner in selected color
    ctx.fillStyle = color.hex;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, 80, [20, 20, 0, 0]);
    ctx.fill();

    // Outfit Name inside banner
    ctx.fillStyle = color.id === "trang" ? "#292524" : "#FFFFFF";
    ctx.font = "bold 28px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(displayTitle.slice(0, 32), cardX + 25, cardY + 45);

    ctx.font = "15px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(
      `${outfit.dynasty} • Dịp: ${occasion} • 📍 ${city.cityName}`,
      cardX + 25,
      cardY + 70
    );

    // Score badge in banner with 3-tier color
    ctx.fillStyle = tierColor;
    ctx.beginPath();
    ctx.roundRect(cardX + cardW - 145, cardY + 16, 125, 48, 12);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`★ ${currentScore.toFixed(1)}/10`, cardX + cardW - 82, cardY + 47);

    const finishCardRender = (dollImgEl?: HTMLImageElement | null) => {
      if (dollImgEl) {
        // Draw the captured doll portrait image on the left of card
        const imgX = cardX + 25;
        const imgY = cardY + 95;
        const imgW = 195;
        const imgH = 260;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(imgX, imgY, imgW, imgH, 14);
        ctx.clip();
        ctx.drawImage(dollImgEl, imgX, imgY, imgW, imgH);
        ctx.restore();

        // Border around doll
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(imgX, imgY, imgW, imgH, 14);
        ctx.stroke();

        // Details on the right of doll
        const textX = cardX + 235;
        const textW = cardW - 255;

        // Details content
        ctx.fillStyle = "#1E293B";
        ctx.textAlign = "left";
        ctx.font = "bold 16px 'Be Vietnam Pro', sans-serif";
        ctx.fillText("Chi tiết lớp trang phục đang mặc:", textX, cardY + 120);

        ctx.font = "14px 'Be Vietnam Pro', sans-serif";
        ctx.fillStyle = "#334155";
        let detailY = cardY + 148;
        if (currentOutfit) {
          if (currentOutfit.outer) {
            ctx.fillText(`• Áo ngoài: ${currentOutfit.outer.name}`, textX, detailY);
            detailY += 24;
          }
          if (currentOutfit.inner) {
            ctx.fillText(`• Lớp trong: ${currentOutfit.inner.name}`, textX, detailY);
            detailY += 24;
          }
          if (currentOutfit.bottom) {
            ctx.fillText(`• Hạ y: ${currentOutfit.bottom.name}`, textX, detailY);
            detailY += 24;
          }
          if (currentOutfit.footwear) {
            ctx.fillText(`• Giày dép: ${currentOutfit.footwear.name}`, textX, detailY);
            detailY += 24;
          }
          if (currentOutfit.accessory || currentOutfit.headwear) {
            const accName = currentOutfit.headwear?.name || currentOutfit.accessory?.name || "";
            ctx.fillText(`• Phụ kiện: ${accName}`, textX, detailY);
            detailY += 24;
          }
        } else {
          ctx.fillText(`• Áo chính: ${outfit.name}`, textX, detailY);
          detailY += 24;
          ctx.fillText(`• Phụ kiện: ${levelInfo.headwear}`, textX, detailY);
          detailY += 24;
        }

        // Core rule
        ctx.fillStyle = "#065F46";
        ctx.font = "bold 14px 'Be Vietnam Pro', sans-serif";
        ctx.fillText("🔒 Khóa gen cốt lõi:", textX, detailY + 10);
        ctx.fillStyle = "#047857";
        ctx.font = "13px 'Be Vietnam Pro', sans-serif";
        wrapText(ctx, outfit.coreRule, textX, detailY + 30, textW, 18);
      } else {
        // Fallback text view if no image captured
        ctx.fillStyle = "#1E293B";
        ctx.textAlign = "left";
        ctx.font = "bold 18px 'Be Vietnam Pro', sans-serif";
        ctx.fillText("Ý nghĩa & Lịch sử:", cardX + 30, cardY + 125);

        ctx.font = "15px 'Be Vietnam Pro', sans-serif";
        ctx.fillStyle = "#475569";
        wrapText(ctx, outfit.desc, cardX + 30, cardY + 155, cardW - 60, 24);

        ctx.fillStyle = "#065F46";
        ctx.font = "bold 16px 'Be Vietnam Pro', sans-serif";
        ctx.fillText("🔒 Khóa gen cốt lõi:", cardX + 30, cardY + 235);
        ctx.fillStyle = "#047857";
        ctx.font = "15px 'Be Vietnam Pro', sans-serif";
        wrapText(ctx, outfit.coreRule, cardX + 30, cardY + 265, cardW - 60, 22);
      }

      // Section 2: Styling Level & Evaluation Container
      const sec2Y = 600;
      ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
      ctx.beginPath();
      ctx.roundRect(cardX, sec2Y, cardW, 410, 20);
      ctx.fill();

      // Styling Level Header
      ctx.fillStyle = "#064E3B";
      ctx.font = "bold 22px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        `Nấc Phối Đồ: Nấc ${levelInfo.level} - ${levelInfo.title}`,
        cardX + 30,
        sec2Y + 40
      );

      ctx.fillStyle = "#059669";
      ctx.font = "15px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`Phong cách: ${levelInfo.vibe}`, cardX + 30, sec2Y + 70);

      // Color Swatch Preview
      ctx.fillStyle = "#F1F5F9";
      ctx.beginPath();
      ctx.roundRect(cardX + 30, sec2Y + 95, cardW - 60, 58, 12);
      ctx.fill();

      // Color box
      ctx.fillStyle = color.hex;
      ctx.beginPath();
      ctx.roundRect(cardX + 45, sec2Y + 107, 34, 34, 8);
      ctx.fill();
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 15px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`Sắc màu truyền thống: ${color.vietnameseName}`, cardX + 90, sec2Y + 125);
      ctx.fillStyle = "#64748B";
      ctx.font = "13px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`Ý nghĩa: ${color.meaning}`, cardX + 90, sec2Y + 145);

      // Status tier card
      const tierBg =
        currentScore >= 8.0
          ? "#ECFDF5"
          : currentScore >= 6.0
          ? "#FFFBEB"
          : "#FEF2F2";
      const tierBorder =
        currentScore >= 8.0
          ? "#10B981"
          : currentScore >= 6.0
          ? "#F59E0B"
          : "#EF4444";

      ctx.fillStyle = tierBg;
      ctx.beginPath();
      ctx.roundRect(cardX + 30, sec2Y + 170, cardW - 60, 68, 12);
      ctx.fill();
      ctx.strokeStyle = tierBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = tierColor;
      ctx.font = "bold 15px 'Be Vietnam Pro', sans-serif";
      const tierHeader =
        currentScore >= 8.0
          ? "✓ CỐM DUYỆT • CHUẨN NẾP / SLAY (8 - 10 ĐIỂM)"
          : currentScore >= 6.0
          ? "⚠ CẢNH BÁO • CHƯA HỢP BỐI CẢNH / DỊP MẶC (6 - 7 ĐIỂM)"
          : "✕ CẢNH BÁO • SAI LỆCH VĂN HÓA TRẦM TRỌNG (2 - 3 ĐIỂM)";
      ctx.fillText(tierHeader, cardX + 45, sec2Y + 195);

      ctx.fillStyle = "#334155";
      ctx.font = "13px 'Be Vietnam Pro', sans-serif";
      const subFeedback =
        validation?.warnings && validation.warnings.length > 0
          ? `Lưu ý: ${validation.warnings.join("; ")}`
          : `Đạt tiêu chuẩn văn hóa cho dịp ${occasion}`;
      ctx.fillText(subFeedback.slice(0, 75), cardX + 45, sec2Y + 222);

      // Cốm Review Remark
      ctx.fillStyle = "#F8FAFC";
      ctx.beginPath();
      ctx.roundRect(cardX + 30, sec2Y + 255, cardW - 60, 130, 14);
      ctx.fill();
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#065F46";
      ctx.font = "bold 15px 'Be Vietnam Pro', sans-serif";
      ctx.fillText("🌱 Lời thẩm định của Cốm Duyệt:", cardX + 45, sec2Y + 282);

      ctx.fillStyle = "#334155";
      ctx.font = "italic 13.5px 'Be Vietnam Pro', sans-serif";
      wrapText(ctx, `"${currentFeedback}"`, cardX + 45, sec2Y + 308, cardW - 90, 20);

      // 3. OFFICIAL CULTURAL SEAL / DẤU MỘC CỐM DUYỆT
      const stampX = width - 180;
      const stampY = height - 140;
      ctx.save();
      ctx.translate(stampX, stampY);
      ctx.rotate((-12 * Math.PI) / 180);

      // Outer circle
      ctx.strokeStyle = tierColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.stroke();

      // Stamp text
      ctx.fillStyle = tierColor;
      ctx.font = "bold 11px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("★ VIỆT PHỤC GEN Z ★", 0, -32);

      ctx.font = "900 15px 'Be Vietnam Pro', sans-serif";
      wrapText(ctx, currentSeal, -50, -6, 100, 16);

      ctx.font = "bold 12px monospace";
      ctx.fillText(`${currentScore.toFixed(1)}/10`, 0, 36);

      ctx.font = "9px monospace";
      ctx.fillText(new Date().toLocaleDateString("vi-VN"), 0, 48);

      ctx.restore();

      // Footer note
      ctx.fillStyle = "#A7F3D0";
      ctx.font = "14px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Cốm Duyệt • Giữ hồn nếp xưa, thắp sáng nét đẹp ngàn năm văn hiến",
        width / 2,
        height - 45
      );

      resolve(canvas.toDataURL("image/png"));
    };

    if (capturedDollImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => finishCardRender(img);
      img.onerror = () => finishCardRender(null);
      img.src = capturedDollImage;
    } else {
      finishCardRender(null);
    }
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
