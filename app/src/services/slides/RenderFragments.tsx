import { TypographyProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { FilledTextFragment } from '../game-maker/fillTextFragments';

type Props = TypographyProps & {
   filledFragments: FilledTextFragment[];
};

function RenderFragments({ filledFragments }: Props) {
   const { t } = useTranslation();
   return <>{filledFragments.map((x, i) => renderFragment(x, t, i))}</>;
}

function renderFragment(fragment: FilledTextFragment, t: TFunction, index: number) {
   switch (fragment.type) {
      case 'plain':
         return fragment.text;
      case 'player':
         return <b key={index}>{fragment.player.name}</b>;
      case 'selection':
         return <b key={index}>{fragment.text}</b>;
      case 'sips':
         return <b key={index}>{t('game.sip', { count: fragment.amount })}</b>;
   }
}

export default RenderFragments;
