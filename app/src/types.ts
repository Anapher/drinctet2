import * as z from 'zod';
import { GameCardData } from './card-schemas';
import { SlideType } from './services/slides/registry';

export const GenderSchema = z.enum(['male', 'female']);
export type Gender = z.infer<typeof GenderSchema>;

export const PlayerSchema = z.object({
   id: z.string(),
   name: z.string().min(1),
   gender: GenderSchema,
});

export type Player = z.infer<typeof PlayerSchema>;

export const GameConfigSchema = z.object({
   players: z.array(PlayerSchema).min(2),
   cardDeckIds: z.array(z.string()).min(1),
   couples: z.array(z.tuple([z.string(), z.string()])).optional(),
   pairOppositeGendersMoreLikely: z.boolean().optional(),
   slideTypeWeights: z.record(z.number()),
});
export type GameConfig = z.infer<typeof GameConfigSchema>;

export type AppConfig = {
   language: string;
};

export type CardDeck = {
   name: string;
   id: string;
};

export type Game = {
   config: GameConfig;
   stack: CachedSlide[];
   stackIndex: number;
};

export type GameContext = {
   game: Game;
   cards: GameCard[];
   lang: string;
   cache: Map<string, any>;
};

export type CachedSlide = {
   type: SlideType;
   state: any;
};

export type GameCard<T = GameCardData> = {
   data: T;
   id: string;
};
