export const avatarLetters = (title: string | null) => {
  const words = title ? title.trim().split(/\s+/).filter(Boolean) : '';
  const isOneWord = words.length === 1;
  const letters = [];
  if (words.length < 1) return [];

  if (!isOneWord) {
    letters.push(words[0][0].toUpperCase());
    letters.push(words[1][0].toUpperCase());
  } else {
    for (const letter of words[0]) {
      if (letter === letter.toUpperCase() && letter !== letter.toLowerCase()) {
        letters.push(letter);
      }
      if (letters.length >= 2) {
        break;
      }
    }

    if (letters.length < 1 && title && title.length > 0) {
      for (const letter of words[0]) {
        letters.push(letter.toUpperCase());
        if (letters.length >= 2) {
          break;
        }
      }
    }
  }
  return letters;
};
