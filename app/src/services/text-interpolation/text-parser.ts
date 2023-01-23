const VarStartChar = '{';
const VarEndChar = '}';
const EscapeChar = '\\';
const SelectionStartChar = '[';
const SelectionEndChar = ']';

const PlayerVariable = 'player';
const SipsVariable = 'sips';
const VariableParametersStart = ':';

const SelectionLetterId = 'a-z';
const SelectionElementsDelimiter = '|';

export default function parseText(s: string): TextFragment[] {
   const result: TextFragment[] = [];
   let index = 0;
   let lastTokenIndex = 0;

   const pushPriorPlainText = () => {
      if (lastTokenIndex !== index) {
         result.push({ type: 'plain', text: s.substring(lastTokenIndex, index) });
      }
   };

   do {
      if (s[index] == VarStartChar) {
         pushPriorPlainText();

         const token = readToken(s, index, VarEndChar);
         index = token.index;

         result.push(parseVariableFragment(token.value));
      } else if (s[index] === SelectionStartChar) {
         pushPriorPlainText();

         const content = readToken(s, index, SelectionEndChar);
         index = content.index;

         result.push(parseRandomSelectionVariable(content.value));
      } else {
         continue;
      }

      lastTokenIndex = index;
   } while (++index < s.length);

   if (lastTokenIndex !== s.length) {
      result.push({ type: 'plain', text: s.substring(lastTokenIndex) });
   }

   return result;
}

function parseVariableFragment(content: string): TextFragment {
   if (content.toLowerCase().startsWith(PlayerVariable)) {
      content = content.toLowerCase();

      // Samples:
      // {player1}
      // {player12}
      // {player}

      const { index } = parseNumberedToken(content, PlayerVariable);
      return { type: 'player', index };
   }

   if (content.toLowerCase().startsWith(SipsVariable)) {
      content = content.toLowerCase();

      // Samples:
      // {sips}
      // {sips2}
      // {sips2:2}
      // {sips4:6}

      const { index, param } = parseNumberedToken(content, SipsVariable, true);
      let min: number | undefined = undefined;

      if (param !== undefined) {
         min = Number(param);
         if (Number.isNaN(min)) {
            throw new Error('Sips min value must be a number');
         }
      }

      return { type: 'sips', index, min };
   }

   if (content.includes('/')) {
      const splits = content.split('/');
      if (splits.length !== 2) {
         throw new Error("A gendered fragment must have exactly two parts delimited by a '/'");
      }

      return { type: 'gendered', male: splits[0], female: splits[1] };
   }

   throw new Error(`Invalid variable ${content}`);
}

function parseRandomSelectionVariable(content: string): TextFragment {
   if (content.toLowerCase() === SelectionLetterId) {
      return { type: 'random-selection-letter' };
   }

   if (/^[0-9]+-[0-9]+$/.test(content)) {
      const [min, max] = content.split('-').map(Number);
      if (min > max) {
         throw new Error(`Min (${min}) must not be larger than max (${max})`);
      }

      return { type: 'random-selection-number', min, max };
   }

   const options = splitQuoted(content, SelectionElementsDelimiter);
   return { type: 'random-selection', options };
}

function readToken(value: string, index: number, endChar: string): { value: string; index: number } {
   const length = value.length;
   const tokenStart = index;

   while (++index < length) {
      const char = value[index];

      if (char === EscapeChar) {
         index++;
         continue;
      }

      if (char === endChar) {
         index++;
         break;
      }
   }

   return { index, value: value.substring(tokenStart + 1, index - 1) };
}

function parseNumberedToken(
   value: string,
   tokenName: string,
   allowParameter = false,
): { index: number; param?: string } {
   const parameterBegin = value.indexOf(VariableParametersStart);
   let param: string | undefined;

   let tag: string;
   if (parameterBegin === -1 || !allowParameter) {
      tag = value;
   } else {
      tag = value.substring(0, parameterBegin);
      param = value.substring(parameterBegin + 1);
   }

   let index = 1;

   if (tag.length > tokenName.length) {
      index = Number(tag.substring(tokenName.length));
      if (Number.isNaN(index)) {
         throw new Error(`The index of "${tag}" could not be parsed.`);
      }
   }

   return { index, param };
}

function splitQuoted(value: string, delimiter: string): string[] {
   let tokenStart = 0;
   const result: string[] = [];

   while (value.length > tokenStart - 1) {
      let withinQuotes = false;

      if (value[tokenStart] === '"') {
         withinQuotes = true;
         tokenStart++;
      }

      let i = tokenStart;
      do {
         if (value[i] === delimiter) {
            if (withinQuotes) continue;

            result.push(value.substring(tokenStart, i));
            tokenStart = i + 1;
            break;
         }

         if (value[i] == '"') {
            if (!withinQuotes) {
               continue; //allow quotes in the middle
            }

            if (i == value.length - 1) {
               //if its the last char
               result.push(value.substring(tokenStart, i).replace('""', '"'));
               return result;
            }

            const nextChar = value[i + 1];
            if (nextChar == '"') {
               i++;
               continue; //escaped quotes
            }

            if (nextChar != delimiter) throw new Error('The delimiter must come after the closing quotes.');

            result.push(value.substring(tokenStart, i).replace('""', '"'));
            tokenStart = i + 2;
            break;
         }

         if (i == value.length - 1) {
            if (withinQuotes) {
               throw new Error('The text must end with a quote');
            }

            result.push(value.substring(tokenStart, i + 1));
            return result;
         }
      } while (++i < value.length);
   }

   return result;
}

export type PlainTextFragment = {
   type: 'plain';
   text: string;
};

export type PlayerFragment = {
   type: 'player';
   index: number;
};

export type SipsFragment = {
   type: 'sips';
   index: number;
   min?: number;
};

export type GenderedFragment = {
   type: 'gendered';
   male: string;
   female: string;
};

export type RandomListSelectionFragment = {
   type: 'random-selection';
   options: string[];
};

export type RandomLetterSelectionFragment = {
   type: 'random-selection-letter';
};

export type RandomNumberSelectionFragment = {
   type: 'random-selection-number';
   min: number;
   max: number;
};

export type TextFragment =
   | PlainTextFragment
   | PlayerFragment
   | SipsFragment
   | GenderedFragment
   | RandomListSelectionFragment
   | RandomLetterSelectionFragment
   | RandomNumberSelectionFragment;
