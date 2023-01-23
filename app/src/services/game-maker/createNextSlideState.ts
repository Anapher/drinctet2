import { CachedSlide, Game, GameContext } from '../../types';
import { selectRandomWeighted } from '../../utils/random-utils';
import { SlideType } from '../slides/registry';
import { getSlideFactory } from './getSlideFactory';
import { NoCardFoundError } from './selectCard';

export default function createNextSlideState(context: GameContext): CachedSlide {
   let slideTypes = Object.keys(context.game.config.slideTypeWeights) as SlideType[];

   while (slideTypes.length > 0) {
      const slideType = selectNextSlideType(context.game, slideTypes);
      const factory = getSlideFactory(slideType);

      try {
         const state = factory.createState(context);
         return { type: slideType, state };
      } catch (error) {
         slideTypes = slideTypes.filter((x) => x !== slideType);
         if (error instanceof NoCardFoundError) {
            console.log(`No cards found for ${slideType}, skip this slide`);
         } else console.error(`Error occurred when trying to create slide state for ${slideType}`, error);
      }
   }

   throw new Error('For no slides, there were cards found');
}

function selectNextSlideType(game: Game, slideTypes: SlideType[]): SlideType {
   return selectRandomWeighted(slideTypes, (type) => game.config.slideTypeWeights[type]) as SlideType;
}
