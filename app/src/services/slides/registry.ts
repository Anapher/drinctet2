import customTruthOrDare from './customTruthOrDare';
import category from './category';
import neverHaveIEver from './neverHaveIEver';
import mostLikely from './mostLikely';
import dare from './dare';

const slideFactories = {
   customTruthOrDare,
   category,
   neverHaveIEver,
   mostLikely,
   dare,
};

export type SlideType = keyof typeof slideFactories;

export default slideFactories;
