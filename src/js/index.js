import 'regenerator-runtime/runtime';
import getNoteData from './getNoteData.js';
import { beep } from './oscillator';
import { sleep, getSpeed, getFrequency } from './utils/helpers.js';

const playButton = document.querySelector('#play');
const noteInput = document.querySelector('#note-input');
const additionalNoteInput = document.querySelector('#note-input-additional');
const timbreRange = document.querySelector('#timbre-range');
const speedRange = document.querySelector('#speed-range');
const volumeRange = document.querySelector('#volume-range');
const speedLabel = document.querySelector('#speed-label');

speedRange.addEventListener('change', ({ target }) => {
  speedLabel.innerHTML = `${target.value} bpm`;
});

const playMelody = async (notesList) => {
  const context = new AudioContext();

  for (let rawNote of notesList) {
    if (!rawNote) return;

    const timbre = Number(timbreRange.value);
    const speed = getSpeed(Number(speedRange.value));
    const volume = volumeRange.value;

    const { digitNote, duration } = getNoteData(rawNote, timbre, speed);

    const frequency = getFrequency(digitNote);
    const gain = Number(volume) / 10;

    await beep(context, { duration, frequency, gain });
    await sleep(20);
  }
};

playButton.onclick = async () => {
  const notesList = noteInput.value.split(/[\s,\n]+/);
  const additionalNotesList = additionalNoteInput.value.split(/[\s,\n]+/);

  playMelody(notesList);
  playMelody(additionalNotesList);
};
