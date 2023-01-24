import { motion, PanInfo, useAnimation, useMotionValue, useTransform, Variants } from 'framer-motion';
import { interpolate } from 'popmotion';
import { useMemo, useRef } from 'react';

export type ScrollContainerProps<T> = {
   items: T[];
   index: number;
   onChangeIndex: (index: number) => void;
   getBackgroundColor: (index: number) => void;
   endOfScrollColor: string;

   renderItem: (index: number) => React.ReactNode;
};

const variants: Variants = {
   toTop: {
      y: '100%',
      pointerEvents: 'none',
   },
   toBottom: {
      y: '-100%',
      pointerEvents: 'none',
   },
   center: {
      y: 0,
      pointerEvents: 'initial',
   },
};

function ScrollContainer<T>({
   items,
   index,
   onChangeIndex,
   getBackgroundColor,
   renderItem,
   endOfScrollColor,
}: ScrollContainerProps<T>) {
   const y = useMotionValue(0);
   const animation = useAnimation();
   const containerRef = useRef<HTMLDivElement>(null);

   const currentIndex = useRef({ index, len: items.length });
   currentIndex.current = { index, len: items.length };

   const canScrollUp = index > 0;
   const canScrollDown = index !== items.length - 1;

   const prevIndex = canScrollUp ? index - 1 : undefined;
   const nextIndex = canScrollDown ? index + 1 : undefined;

   const backgroundColorInterpolator = useMemo(() => {
      const colors = [
         index < items.length - 1 ? getBackgroundColor(index + 1) : endOfScrollColor,
         getBackgroundColor(index),
         index > 0 ? getBackgroundColor(index - 1) : endOfScrollColor,
      ];

      const yInput = [-200, 0, 200];

      return interpolate(yInput, colors);
   }, [getBackgroundColor, items, index, endOfScrollColor]);

   const backgroundColorInterpolatorRef = useRef<(v: number) => string | void>(backgroundColorInterpolator);
   backgroundColorInterpolatorRef.current = backgroundColorInterpolator;

   const background = useTransform(y, (v) => backgroundColorInterpolatorRef.current(v));

   const handleOnDragEnd = async (_: any, info: PanInfo) => {
      console.log(info.velocity.y);
      console.log(info.offset.y, containerRef.current?.clientHeight || 600);
      const doIt =
         Math.abs(info.velocity.y) > 500 || Math.abs(info.offset.y) > (containerRef.current?.clientHeight || 600) * 0.1;

      if (doIt && info.offset.y > 0 && canScrollUp) {
         await animation.start('toTop');
         onChangeIndex(index - 1);
         y.set(0);
      } else if (doIt && info.offset.y < 0 && canScrollDown) {
         await animation.start('toBottom');
         onChangeIndex(index + 1);
         y.set(0);
      }
   };

   return (
      <motion.div style={{ background, width: '100%', height: '100%', overflowY: 'hidden' }} ref={containerRef}>
         <motion.div
            style={{ width: '100%', height: '100%', y }}
            variants={variants}
            animate={animation}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: canScrollDown ? 0.8 : 0.2, bottom: canScrollUp ? 0.8 : 0.2 }}
            onDragEnd={handleOnDragEnd}
            key={index}
         >
            <div key={index} style={{ width: '100%', height: '100%' }}>
               {renderItem(index)}
            </div>
            {prevIndex !== undefined && (
               <div style={{ width: '100%', height: '100%', transform: 'translateY(-200%)' }}>
                  {renderItem(prevIndex)}
               </div>
            )}
            {nextIndex !== undefined && (
               <div style={{ width: '100%', height: '100%', transform: canScrollUp ? 'translateY(-100%)' : undefined }}>
                  {renderItem(nextIndex)}
               </div>
            )}
         </motion.div>
      </motion.div>
   );
}

export default ScrollContainer;
