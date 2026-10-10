export function speakVietnamese(
  text: string,
  rate = 1.0,
  pitch = 1.0,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (!("speechSynthesis" in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // stop any previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Try finding Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(
      (v) => v.lang.startsWith("vi") || v.name.toLowerCase().includes("vietnam")
    );
    if (viVoice) {
      utterance.voice = viVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error("Speech error", err);
    if (onEnd) onEnd();
    return false;
  }
}
