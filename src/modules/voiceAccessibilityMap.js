export function handleVoiceAccessibilityCommand(phrase, toggles) {
  if (phrase.includes("contrast")) toggles.toggleContrast();
  if (phrase.includes("voice confirm")) toggles.toggleVoice();
  if (phrase.includes("audio hint")) toggles.toggleAudioHints();
}
