export const TRACKS = {
  persuasive: {
    id: 'persuasive',
    title: 'Speak Persuasive',
    subtitle: 'Claim, reason, rebuttal.',
    durationMin: 8,
    prompt: 'Remote work improves output more than office work.',
    focusHint: 'Lead with one claim, then one concrete reason.',
    reflection: 'Great structure. Next attempt: add one concrete metric in the first 20 seconds.',
  },
  fast: {
    id: 'fast',
    title: 'Think Fast',
    subtitle: 'Answer confidently on the spot.',
    durationMin: 6,
    prompt: 'Tell me about a time you handled conflict in a team.',
    focusHint: 'Start with outcome first, then context.',
    reflection: 'Strong example. Next attempt: shorten your opening sentence by 30%.',
  },
  pressure: {
    id: 'pressure',
    title: 'Pressure Clarity',
    subtitle: 'Stay calm when constraints change.',
    durationMin: 7,
    prompt: 'You are briefing users after an outage. Midway, legal changes your wording constraints.',
    focusHint: 'Keep sequence: what happened → impact → next steps.',
    reflection: 'Composure stayed strong. Next: move action plan to sentence one.',
  },
  human: {
    id: 'human',
    title: 'Speak Human',
    subtitle: 'Tell stories people remember.',
    durationMin: 8,
    prompt: 'Tell a 60-second story about a setback that improved your decision-making.',
    focusHint: 'Use hook, conflict, payoff in order.',
    reflection: 'Great hook. Next: make the conflict more specific and end with one lesson line.',
  },
};

export const TRACK_LIST = [TRACKS.persuasive, TRACKS.fast, TRACKS.pressure, TRACKS.human];
