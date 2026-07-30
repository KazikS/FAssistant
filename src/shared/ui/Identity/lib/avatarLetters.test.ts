import { describe, expect, it } from 'vitest';

import { avatarLetters } from './avatarLetters';

describe('avatarLetters', () => {
  it('нет слов - пустой массив', () => {
    expect(avatarLetters('')).toEqual([]);
  });

  it('одно слово без заглавных - первые две буквы капсом', () => {
    expect(avatarLetters('name')).toEqual(['N', 'A']);
  });

  it('одно слово с одной заглавной - одна буква в массиве', () => {
    expect(avatarLetters('Name')).toEqual(['N']);
    expect(avatarLetters('nAme')).toEqual(['A']);
  });

  it('одно слово с двумя или более заглавными - две первые буквы в массиве', () => {
    expect(avatarLetters('NamE')).toEqual(['N', 'E']);
    expect(avatarLetters('NAmE')).toEqual(['N', 'A']);
    expect(avatarLetters('NAME')).toEqual(['N', 'A']);
    expect(avatarLetters('NaME')).toEqual(['N', 'M']);
  });

  it('два слова - по одной первой букве обоих слов', () => {
    expect(avatarLetters('my name')).toEqual(['M', 'N']);
  });

  it('лишние пробелы', () => {
    expect(avatarLetters('my  name')).toEqual(['M', 'N']);
    expect(avatarLetters(' my  name')).toEqual(['M', 'N']);
    expect(avatarLetters(' my  name ')).toEqual(['M', 'N']);
    expect(avatarLetters('my  name ')).toEqual(['M', 'N']);
    expect(avatarLetters('my  ')).toEqual(['M', 'Y']);
    expect(avatarLetters('  my  ')).toEqual(['M', 'Y']);
  });
});
