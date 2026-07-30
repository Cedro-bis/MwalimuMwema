export const isTextAnswerCorrect = (userAnswer: any, correctAnswerText: string | undefined): boolean => {
  const uStr = String(userAnswer || '').trim().toLowerCase();
  const cStr = String(correctAnswerText || '').trim().toLowerCase();
  if (!uStr || !cStr) return false;

  // 1. Direct or reciprocal substring match
  if (uStr.includes(cStr) || cStr.includes(uStr)) {
    return true;
  }

  // 2. Split by separator (commas, semicolons, slashes, or dashes) to extract individual keyword terms
  const terms = cStr.split(/[;,/-]+/).map(t => t.trim()).filter(t => t.length > 2);
  if (terms.length > 0) {
    const matchedCount = terms.filter(term => uStr.includes(term)).length;
    if (matchedCount >= 1 && uStr.length >= 8) {
      return true;
    }
  }

  // 3. Fallback word-by-word intersection check:
  // Split both into individual words, keeping only meaningful words (length > 3) and filtering out French grammatical stop words.
  const stopWords = ['avec', 'dans', 'pour', 'plus', 'sans', 'sous', 'vers', 'chez', 'sont', 'être', 'elle', 'elles', 'nous', 'vous', 'leur', 'leurs', 'cette', 'ces', 'mais', 'donc', 'parce', 'comme', 'alors'];
  const userWords = uStr.split(/[\s,.'";?!()-]+/).map(w => w.trim()).filter(w => w.length > 3 && !stopWords.includes(w));
  const correctWords = cStr.split(/[\s,.'";?!()-]+/).map(w => w.trim()).filter(w => w.length > 3 && !stopWords.includes(w));

  if (correctWords.length > 0) {
    const matchedWords = correctWords.filter(cw => userWords.some(uw => uw.includes(cw) || cw.includes(uw)));
    const threshold = Math.max(1, Math.ceil(correctWords.length * 0.45)); // Need ~45% of the keywords matched
    if (matchedWords.length >= threshold) {
      return true;
    }
  }

  return false;
};
