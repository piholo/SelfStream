export const config = {
  tmdbApiKey: process.env.TMDB_API_KEY || "YOUR_TMDB_API_KEY_HERE",
  vixsrcDomain: "vixsrc.to",
  vixcloudDomain: "vixcloud.co"
};

export const AVAILABLE_LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español (España)', flag: '🇪🇸' },
  { code: 'es-419', label: 'Español (Latinoamérica)', flag: '🇲🇽' },
  { code: 'fr', label: 'Français (France)', flag: '🇫🇷' },
  { code: 'fr-ca', label: 'Français (Canada)', flag: '🇨🇦' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português (Portugal)', flag: '🇵🇹' },
  { code: 'pt-br', label: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-tw', label: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'fil', label: 'Filipino', flag: '🇵🇭' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ca', label: 'Català', flag: '🏴' },
  { code: 'eu', label: 'Euskara', flag: '🏴' },
  { code: 'gl', label: 'Galego', flag: '🏴' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' }
];

export interface UserConfig {
  vixEnabled: boolean;
  vixLang: string;
  cinemacityEnabled: boolean;
  cinemacityLang: string;
  animeunityEnabled: boolean;
}

export const DEFAULT_CONFIG: UserConfig = {
  vixEnabled: true,
  vixLang: 'en',
  cinemacityEnabled: false, // disabled — Cloudflare bypass no longer viable
  cinemacityLang: 'en',
  animeunityEnabled: false
};

export function encodeConfig(cfg: UserConfig): string {
  return Buffer.from(JSON.stringify(cfg)).toString('base64url');
}

export function decodeConfig(token: string): UserConfig {
  try {
    const parsed = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    return {
      vixEnabled: parsed.vixEnabled === true,
      vixLang: parsed.vixLang || DEFAULT_CONFIG.vixLang,
      cinemacityEnabled: parsed.cinemacityEnabled === true,
      cinemacityLang: parsed.cinemacityLang || DEFAULT_CONFIG.cinemacityLang,
      animeunityEnabled: parsed.animeunityEnabled === true
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}
