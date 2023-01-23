"use strict";
exports.__esModule = true;
exports.gameCardSchema = exports.realTimeGuessingCardSchema = exports.factCardSchema = exports.miniGameCardSchema = exports.chineseWhisperCardSchema = exports.activityCardSchema = exports.mostLikelyCardSchema = exports.thisOrThatCardSchema = exports.dareCardSchema = exports.truthCardSchema = exports.neverHaveIEverCardSchema = exports.categoryCardSchema = void 0;
var z = require("zod");
exports.categoryCardSchema = z.object({
    type: z.literal('category'),
    category: z.record(z.string())
});
exports.neverHaveIEverCardSchema = z.object({
    // Never have I ever... is already there as text
    type: z.literal('neverHaveIEver'),
    statement: z.record(z.string())
});
exports.truthCardSchema = z.object({
    type: z.literal('truth'),
    truth: z.record(z.string())
});
exports.dareCardSchema = z.object({
    type: z.literal('dare'),
    dare: z.record(z.string())
});
exports.thisOrThatCardSchema = z.object({
    type: z.literal('thisOrThat'),
    option1: z.record(z.string()),
    option2: z.record(z.string())
});
exports.mostLikelyCardSchema = z.object({
    type: z.literal('mostLikely'),
    question: z.record(z.string())
});
// Syntax: {player}={player1}, {player2}, ..., {sips} (e.g. 3 sips), [1|2|3] = random selection
exports.activityCardSchema = z.object({
    type: z.literal('activity'),
    content: z.record(z.string())
});
exports.chineseWhisperCardSchema = z.object({
    type: z.literal('chineseWhisper'),
    sentence: z.record(z.string())
});
exports.miniGameCardSchema = z.object({
    type: z.literal('miniGame'),
    content: z.record(z.object({
        title: z.string(),
        shortExplanation: z.string(),
        explanation: z.string()
    }))
});
exports.factCardSchema = z.object({
    type: z.literal('fact'),
    is: z.boolean(),
    text: z.record(z.string())
});
exports.realTimeGuessingCardSchema = z.object({
    type: z.literal('realTimeGuessing'),
    api: z["enum"](['weather', 'stock-price']),
    apiParameters: z.record(z.any()),
    text: z.record(z.string())
});
exports.gameCardSchema = z.discriminatedUnion('type', [
    exports.categoryCardSchema,
    exports.neverHaveIEverCardSchema,
    exports.truthCardSchema,
    exports.dareCardSchema,
    exports.thisOrThatCardSchema,
    exports.mostLikelyCardSchema,
    exports.activityCardSchema,
    exports.chineseWhisperCardSchema,
    exports.miniGameCardSchema,
    exports.factCardSchema,
    exports.realTimeGuessingCardSchema,
]);
