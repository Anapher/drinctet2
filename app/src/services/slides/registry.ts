import customTruthOrDare from './customTruthOrDare';
import category from './category';
import neverHaveIEver from './neverHaveIEver';
import mostLikely from './mostLikely';

const slideFactories = {
   customTruthOrDare,
   category,
   neverHaveIEver,
   mostLikely,
};

export type SlideType = keyof typeof slideFactories;

export default slideFactories;
