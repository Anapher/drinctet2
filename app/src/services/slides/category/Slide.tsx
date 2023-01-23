import { useTranslation } from 'react-i18next';
import { State } from '.';
import SimpleTextCard from '../SimpleTextCard';

type Props = {
   state: State;
};

function CategorySlide({ state: { startingPlayerName, textFragments, sips } }: Props) {
   const { t } = useTranslation();

   return (
      <SimpleTextCard
         title={t<string>('slides:category.title')}
         textFragments={textFragments}
         description={t('slides:category.description', {
            player: startingPlayerName,
            sips: t('game.sip', { count: sips }),
         })}
      />
   );
}

export default CategorySlide;
