import { useTranslation } from 'react-i18next';
import { State } from '.';
import SimpleTextCard from '../SimpleTextCard';

type Props = {
   state: State;
};

function MostLikelySlide({ state: { textFragments, sips } }: Props) {
   const { t } = useTranslation();

   return (
      <SimpleTextCard
         textFragments={textFragments}
         description={t('slides:mostLikely.description', { sips: t('game.sip', { count: sips }) })}
      />
   );
}

export default MostLikelySlide;
