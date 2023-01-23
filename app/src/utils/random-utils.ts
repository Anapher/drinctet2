export type RNG = () => number;
const defaultRandomGenerator: RNG = () => Math.random();

export function selectRandomWeighted<T>(
   items: T[],
   getWeight: (item: T) => number,
   random: RNG = defaultRandomGenerator,
): T | undefined {
   if (items.length === 0) {
      return undefined;
   }

   const weights: Array<{ item: T; weight: number }> = [];
   let totalWeight = 0;
   for (const item of items) {
      const weight = getWeight(item);
      weights.push({ item, weight });

      totalWeight += weight;
   }

   let randomWeight = totalWeight * random();
   for (const { item, weight } of weights) {
      if (weight === 0) {
         continue;
      }
      randomWeight -= weight;

      if (randomWeight <= 0) {
         return item;
      }
   }

   return undefined;
}
