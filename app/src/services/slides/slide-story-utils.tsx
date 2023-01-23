import { useState } from 'react';
import SlideFactory from './card-factory';

export type RenderSlideWithBackgroundProps<TState> = {
   state: TState;
   slideFactory: SlideFactory<TState>;
};

export function RenderSlideWithBackground<TState>({ slideFactory, state }: RenderSlideWithBackgroundProps<TState>) {
   const [currentState, setCurrentState] = useState(state);
   const handleChange = (state: TState) => {
      setCurrentState(state);
   };

   return (
      <div
         style={{
            background: slideFactory.getBackgroundColor(currentState),
            width: '100vw',
            height: '100vh',
            margin: -16,
         }}
      >
         {slideFactory.renderState(currentState, handleChange, null as any)}
      </div>
   );
}
