/**
 * Canonical member-field script: English/Latin characters.
 * UI language (or/hi/en) is separate from stored registration data.
 */

const NON_LATIN_LETTER =
  /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]/;

/** True when the string has no Indic-script letters (Latin/punct/digits OK). */
export function isLatinScriptText(value: string): boolean {
  return !NON_LATIN_LETTER.test(value);
}

export const LATIN_SCRIPT_MESSAGE_OR =
  "ଏହି ଘରେ ଇଂରାଜୀ/ଲାଟିନ୍ ଅକ୍ଷରରେ ଲେଖନ୍ତୁ (ଉଦାହରଣ: Saroj Kumar Bhuyan)। ଓଡ଼ିଆ କିମ୍ବା ହିନ୍ଦୀ ଲିପି ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।";

export const LATIN_SCRIPT_MESSAGE_EN =
  "Use English/Latin letters for this field (e.g. Saroj Kumar Bhuyan). Do not use Odia or Hindi script.";

export const LATIN_SCRIPT_MESSAGE_HI =
  "इस फ़ील्ड में अंग्रेज़ी/लैटिन अक्षर लिखें (जैसे Saroj Kumar Bhuyan)। ओड़िया या हिंदी लिपि न लिखें।";
