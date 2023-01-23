import { useTranslation } from 'react-i18next';
import { State } from '.';
import SimpleTextCard from '../SimpleTextCard';

type Props = {
   state: State;
};

function NeverHaveIEverSlide({ state: { textFragments, sips } }: Props) {
   const { t } = useTranslation();
   return (
      <SimpleTextCard
         title={t('slides:neverHaveIEver.title') as string}
         textFragments={textFragments}
         description={t('slides:neverHaveIEver.description', { sips: t('game.sip', { count: sips }) })}
      />
   );
}

export default NeverHaveIEverSlide;
