import SlideFactory from '../slides/card-factory';
import slideFactories, { SlideType } from '../slides/registry';

export function getSlideFactory(type: SlideType): SlideFactory<any> {
   return slideFactories[type];
}
