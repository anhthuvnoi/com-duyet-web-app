/**
 * soundEffects.ts - Bộ âm thanh tương tác (Micro-interactions) cho Cốm Duyệt
 * Bao gồm tiếng lật thẻ (sột soạt) và tiếng mặc/tháo đồ (ting)
 */

const FLIP_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3";
const TING_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

let flipAudio: HTMLAudioElement | null = null;
let tingAudio: HTMLAudioElement | null = null;

function getFlipAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!flipAudio) {
    flipAudio = new Audio(FLIP_SOUND_URL);
    flipAudio.preload = "auto";
  }
  return flipAudio;
}

function getTingAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!tingAudio) {
    tingAudio = new Audio(TING_SOUND_URL);
    tingAudio.preload = "auto";
  }
  return tingAudio;
}

/**
 * Phát âm thanh lật thẻ (tiếng sột soạt giấy)
 */
export function playFlipSound(): void {
  try {
    const audio = getFlipAudio();
    if (!audio) return;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // DOMException phòng trường hợp trình duyệt chặn autoplay
        console.warn("Flip sound autoplay prevented:", err);
      });
    }
  } catch (error) {
    console.warn("Error playing flip sound:", error);
  }
}

/**
 * Phát âm thanh mặc/tháo đồ (tiếng ting hoàn thành thao tác)
 */
export function playTingSound(): void {
  try {
    const audio = getTingAudio();
    if (!audio) return;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // DOMException phòng trường hợp trình duyệt chặn autoplay
        console.warn("Ting sound autoplay prevented:", err);
      });
    }
  } catch (error) {
    console.warn("Error playing ting sound:", error);
  }
}
