import React, { useState } from "react";
import { quizQuestions } from "../data/quiz";
import { DialectVoice } from "../data/dialects";
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, Volume2 } from "lucide-react";

interface Props {
  dialect: DialectVoice;
  onSpeak: (text: string) => void;
}

export const QuizTab: React.FC<Props> = ({ dialect, onSpeak }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-5 sm:p-7 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center pb-5 border-b border-emerald-100 mb-6">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>MINI-GAME KIỂM ĐỊNH KIẾN THỨC</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
          Cốm Thử Tài: Nắm Trọn Nếp Cổ Phục
        </h2>
        <p className="text-xs sm:text-sm text-emerald-700 mt-1">
          Trả lời 5 câu hỏi nhanh để nhận chứng nhận "Bậc Thầy Cổ Phục" từ {dialect.name}
        </p>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
            <span>Câu hỏi {currentIdx + 1} / {quizQuestions.length}</span>
            <span className="text-emerald-700 font-extrabold">Điểm: {score}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 uppercase mb-2 inline-block">
              {currentQ.dynastyContext}
            </span>
            <h3 className="text-base sm:text-lg font-black text-emerald-950 mt-1">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnClass = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50/50";
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-red-100 border-red-500 text-red-950 font-bold";
                } else {
                  btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 text-slate-600">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1.5 animate-fadeIn">
              <div className="font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Giải nghĩa chi tiết từ {dialect.name}:</span>
                </span>
                <button
                  onClick={() => onSpeak(currentQ.explanation)}
                  className="text-amber-800 underline font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe</span>
                </button>
              </div>
              <p className="leading-relaxed text-slate-700">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIdx + 1 === quizQuestions.length ? "Xem Kết Quả & Chứng Nhận" : "Câu Tiếp Theo"}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Quiz Finished Certificate */
        <div className="text-center py-6 space-y-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full flex items-center justify-center text-4xl shadow-xl mx-auto border-4 border-white animate-bounce">
              🏆
            </div>
            {/* Red Seal */}
            <div className="absolute -bottom-2 -right-4 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-white shadow-md rotate-12">
              ✓ CỐM DUYỆT
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-emerald-950">
              {score >= 4 ? "Xuất Sắc! Bậc Thầy Cổ Phục" : score >= 2 ? "Khá Tốt! Người Yêu Di Sản" : "Tiếp Tục Rèn Luyện Nhé!"}
            </h3>
            <p className="text-sm text-emerald-800 font-bold mt-1">
              Bạn đã đạt: {score} / {quizQuestions.length} câu đúng
            </p>
            <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
              {score >= 4
                ? `Cốm chính thức cấp con dấu bảo chứng: Bạn đã nắm vững vạt Hữu Nhậm, 5 cúc Ngũ Thân và tinh thần tôn trọng di sản ngàn năm!`
                : `Không sao cả, nét đẹp văn hóa cần thời gian để thấm nhuần. Hãy tiếp tục khám phá các dáng áo cùng Cốm nha!`}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thử Lại Từ Đầu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
