import React from "react";

interface Props {
  className?: string;
  expression?: "happy" | "confused" | "waving";
}

export const ComMascot: React.FC<Props> = ({ className = "w-10 h-10", expression = "happy" }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Linh vật Cốm Cute"
    >
      {/* Background soft circle */}
      <circle cx="60" cy="60" r="56" fill="#D1FAE5" stroke="#10B981" strokeWidth="4" />
      
      {/* Green Rice Flake Leaf Hat / Nón lá cách điệu lá sen xanh */}
      <path
        d="M20 54 Q60 14 100 54 Q60 44 20 54Z"
        fill="#059669"
        stroke="#047857"
        strokeWidth="3"
      />
      <circle cx="60" cy="22" r="5" fill="#FDE68A" />

      {/* Cute Rice Grain / Cốm Body */}
      <ellipse
        cx="60"
        cy="72"
        r="34"
        fill="#34D399"
        stroke="#059669"
        strokeWidth="3"
      />

      {/* Rosy Cheeks */}
      <circle cx="42" cy="76" r="6" fill="#FCA5A5" opacity="0.8" />
      <circle cx="78" cy="76" r="6" fill="#FCA5A5" opacity="0.8" />

      {/* Eyes based on expression */}
      {expression === "confused" ? (
        <>
          {/* Confused / Surprised eyes */}
          <circle cx="48" cy="68" r="5" fill="#064E3B" />
          <circle cx="46" cy="66" r="2" fill="#FFFFFF" />
          <circle cx="72" cy="68" r="5" fill="#064E3B" />
          <circle cx="70" cy="66" r="2" fill="#FFFFFF" />
          {/* Sweat drop */}
          <path d="M86 52 C86 48 90 44 90 44 C90 44 94 48 94 52 C94 55 92 57 90 57 C88 57 86 55 86 52 Z" fill="#60A5FA" />
          {/* O mouth */}
          <ellipse cx="60" cy="80" rx="4" ry="6" fill="#064E3B" />
        </>
      ) : expression === "waving" ? (
        <>
          {/* Joyful blinking eye */}
          <path d="M42 68 Q48 62 54 68" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="72" cy="67" r="4.5" fill="#064E3B" />
          <circle cx="70" cy="65" r="1.8" fill="#FFFFFF" />
          {/* Big happy smile */}
          <path d="M52 77 Q60 86 68 77" stroke="#064E3B" strokeWidth="3" fill="#F43F5E" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Big Sparkle Eyes */}
          <circle cx="48" cy="67" r="4.5" fill="#064E3B" />
          <circle cx="46.5" cy="65" r="1.8" fill="#FFFFFF" />
          <circle cx="72" cy="67" r="4.5" fill="#064E3B" />
          <circle cx="70.5" cy="65" r="1.8" fill="#FFFFFF" />
          {/* Happy smile */}
          <path d="M52 77 Q60 84 68 77" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* Little ancient collar detail (Hữu Nhậm collar) */}
      <path
        d="M50 92 L60 102 L70 92"
        stroke="#FDE68A"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
