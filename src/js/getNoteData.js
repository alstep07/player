import { NOTE_DIGIT_BY_KEY, OCTAVE_KEYS_NUMBER } from './utils/constants.js';

const getNoteData = (rawNote, timbre, speed) => {
  if (!rawNote) return;

  const [note, durationDivider] = rawNote.split('/');
  let noteKey;

  if (note !== '_') {
    const [noteCharacter] = note.match(/[cdefgah]/gi);
    noteKey = noteCharacter.toLowerCase();
  }

  const octave = note.match(/[1-9]/);
  const diezValue = note.match(/#/) ? 1 : 0;
  const isLong = durationDivider.endsWith('.');
  const durationСoefficient = isLong ? 1.5 : 1;

  let digitNote = 0;
  if (noteKey) {
    digitNote =
      timbre +
      NOTE_DIGIT_BY_KEY[noteKey] +
      diezValue +
      OCTAVE_KEYS_NUMBER * octave;
  }

  const duration = (speed / durationDivider) * durationСoefficient;

  return { digitNote, duration };
};

export default getNoteData;
