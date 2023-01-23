import parseText, { TextFragment } from './text-parser';

describe('Test text-parser', () => {
   const dataSet: [string, TextFragment[]][] = [
      ['hello world', [{ type: 'plain', text: 'hello world' }]],
      [
         'Please drink {sips}.',
         [
            { type: 'plain', text: 'Please drink ' },
            { type: 'sips', index: 1 },
            { type: 'plain', text: '.' },
         ],
      ],
      [
         'Please drink {sips2}.',
         [
            { type: 'plain', text: 'Please drink ' },
            { type: 'sips', index: 2 },
            { type: 'plain', text: '.' },
         ],
      ],
      [
         'Hit player {player2} in his face or drink {sips}',
         [
            { type: 'plain', text: 'Hit player ' },
            { type: 'player', index: 2 },
            { type: 'plain', text: ' in his face or drink ' },
            { type: 'sips', index: 1 },
         ],
      ],
      [
         'Tell us about your [house|garage]',
         [
            { type: 'plain', text: 'Tell us about your ' },
            { type: 'random-selection', options: ['house', 'garage'] },
         ],
      ],
      [
         'Which animal starts with [A-Z]',
         [{ type: 'plain', text: 'Which animal starts with ' }, { type: 'random-selection-letter' }],
      ],
      [
         'Count to [20-40] and clap',
         [
            { type: 'plain', text: 'Count to ' },
            { type: 'random-selection-number', min: 20, max: 40 },
            { type: 'plain', text: ' and clap' },
         ],
      ],
      [
         '{player}, you are a {Boy/Girl}',
         [
            { type: 'player', index: 1 },
            { type: 'plain', text: ', you are a ' },
            { type: 'gendered', male: 'Boy', female: 'Girl' },
         ],
      ],
   ];

   it.each(dataSet)('correctly parse text', (input, expected) => {
      const result = parseText(input);

      expect(result).toEqual(expected);
   });
});

export {};
