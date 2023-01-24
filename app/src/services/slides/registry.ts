import customTruthOrDare from './customTruthOrDare';
import category from './category';
import neverHaveIEver from './neverHaveIEver';
import mostLikely from './mostLikely';
import dare from './dare';
import thisOrThat from './thisOrThat';

const slideFactories = {
   customTruthOrDare,
   category,
   neverHaveIEver,
   mostLikely,
   dare,
   thisOrThat,
};

export type SlideType = keyof typeof slideFactories;

export default slideFactories;
