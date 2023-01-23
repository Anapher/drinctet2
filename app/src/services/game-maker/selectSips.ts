export default function selectSips(min?: number, max?: number) {
   min = min || 2;
   max = max || 6;

   return Math.round(Math.random() * (max - min) + min);
}
