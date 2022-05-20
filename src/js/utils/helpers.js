import { MS_IN_MIN, BEATS_PER_MEASURE } from './constants.js';

export const getFrequency = (note) => Math.pow(2, (note - 49) / 12) * 440;

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSpeed = ( bpm ) => MS_IN_MIN * BEATS_PER_MEASURE / bpm;
