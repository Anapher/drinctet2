import customTruthOrDare from './customTruthOrDare';
import category from './category';
import neverHaveIEver from './neverHaveIEver';
import mostLikely from './mostLikely';
import dare from './dare';
import thisOrThat from './thisOrThat';
import activity from './activity';
import fact from './fact';
import customNeverHaveIEver from './customNeverHaveIEver';
import miniGame from './miniGame';

const slideFactories = {
   customTruthOrDare,
   category,
   neverHaveIEver,
   mostLikely,
   dare,
   thisOrThat,
   activity,
   fact,
   customNeverHaveIEver,
   miniGame,
};

export type SlideType = keyof typeof slideFactories;

export default slideFactories;
