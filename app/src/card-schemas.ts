import * as z from 'zod';

export const categoryCardSchema = z.object({
   type: z.literal('category'),
   category: z.record(z.string()),
});
export type CategoryCard = z.infer<typeof categoryCardSchema>;

export const neverHaveIEverCardSchema = z.object({
   // Never have I ever... is already there as text
   type: z.literal('neverHaveIEver'),
   statement: z.record(z.string()),
});
export type NeverHaveIEverCard = z.infer<typeof neverHaveIEverCardSchema>;

export const truthCardSchema = z.object({
   type: z.literal('truth'),
   truth: z.record(z.string()),
});
export type TruthCard = z.infer<typeof truthCardSchema>;

export const dareCardSchema = z.object({
   type: z.literal('dare'),
   dare: z.record(z.string()),
});
export type DareCard = z.infer<typeof dareCardSchema>;

export const thisOrThatCardSchema = z.object({
   type: z.literal('thisOrThat'),
   option1: z.record(z.string()),
   option2: z.record(z.string()),
});
export type ThisOrThatCard = z.infer<typeof truthCardSchema>;

export const mostLikelyCardSchema = z.object({
   type: z.literal('mostLikely'),
   question: z.record(z.string()),
});
export type MostLikelyCard = z.infer<typeof mostLikelyCardSchema>;

// Syntax: {player}={player1}, {player2}, ..., {sips} (e.g. 3 sips), [1|2|3] = random selection
export const activityCardSchema = z.object({
   type: z.literal('activity'),
   content: z.record(z.string()),
});
export type ActivityCard = z.infer<typeof activityCardSchema>;

export const chineseWhisperCardSchema = z.object({
   type: z.literal('chineseWhisper'),
   sentence: z.record(z.string()),
});
export type ChineseWhisperCard = z.infer<typeof chineseWhisperCardSchema>;

export const miniGameCardSchema = z.object({
   type: z.literal('miniGame'),
   content: z.record(
      z.object({
         title: z.string(),
         shortExplanation: z.string(),
         explanation: z.string(),
      }),
   ),
});
export type MiniGameCard = z.infer<typeof miniGameCardSchema>;

export const factCardSchema = z.object({
   type: z.literal('fact'),
   is: z.boolean(),
   text: z.record(z.string()),
});
export type FactCard = z.infer<typeof factCardSchema>;

export const realTimeGuessingCardSchema = z.object({
   type: z.literal('realTimeGuessing'),
   api: z.enum(['weather', 'stock-price']),
   apiParameters: z.record(z.any()),
   text: z.record(z.string()),
});
export type RealTimeGuessingCard = z.infer<typeof realTimeGuessingCardSchema>;

export const gameCardSchema = z.discriminatedUnion('type', [
   categoryCardSchema,
   neverHaveIEverCardSchema,
   truthCardSchema,
   dareCardSchema,
   thisOrThatCardSchema,
   mostLikelyCardSchema,
   activityCardSchema,
   chineseWhisperCardSchema,
   miniGameCardSchema,
   factCardSchema,
   realTimeGuessingCardSchema,
]);

export type GameCardData = z.infer<typeof gameCardSchema>;
