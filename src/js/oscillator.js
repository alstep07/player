
export const beep = async (context, { duration, gain, frequency }) => {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  gainNode.gain.value = gain;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.type = 'triangle';

  oscillator.frequency.setValueAtTime(frequency, context.currentTime);

  oscillator.start();

  setTimeout(() => {
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + 0.03
    );
  }, duration);

  return new Promise((resolve) => setTimeout(resolve, duration));
};
