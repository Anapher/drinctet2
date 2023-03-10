import { SlideType } from './services/slides/registry';

export type GlobalConfig = {
   defaultSlideWeights: Record<SlideType, number>;
};

const globalConfig: GlobalConfig = {
   defaultSlideWeights: {
      customTruthOrDare: 1,
      category: 1,
      neverHaveIEver: 1,
      mostLikely: 1,
      dare: 1,
      thisOrThat: 1,
      activity: 1,
      fact: 1,
      customNeverHaveIEver: 1,
      miniGame: 1,
   },
};

export default globalConfig;
