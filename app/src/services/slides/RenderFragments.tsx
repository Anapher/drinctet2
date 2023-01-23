import { Typography, TypographyProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { FilledTextFragment } from '../game-maker/fillTextFragments';

type Props = TypographyProps & {
   filledFragments: FilledTextFragment[];
};

function RenderFragments({ filledFragments, ...other }: Props) {
   const { t } = useTranslation();
   return <Typography {...other}>{filledFragments.map((x) => renderFragment(x, t))}</Typography>;
}

function renderFragment(fragment: FilledTextFragment, t: TFunction) {
   switch (fragment.type) {
      case 'plain':
         return fragment.text;
      case 'player':
         return <b>{fragment.player.name}</b>;
      case 'selection':
         return <b>{fragment.text}</b>;
      case 'sips':
         return <b>{t('game.sip', { count: fragment.amount })}</b>;
      default:
         break;
   }
}

export default RenderFragments;
