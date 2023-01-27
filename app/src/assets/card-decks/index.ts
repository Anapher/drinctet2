import nice from './nice.json';
import bullshitfacts from './bullshitfacts.json';
import horny from './horny.json';
import shivani_minigame from './shivani_minigame.json';
import shivani_mostlikely from './shivani_mostlikely.json';
import shivani_neverhaveiever from './shivani_neverhaveiever.json';
import shivani_categories from './shivani_categories.json';
import { GameCardData } from '../../card-schemas';

export default {
   nice,
   bullshitfacts,
   horny,
   shivani_minigame,
   shivani_mostlikely,
   shivani_neverhaveiever,
   shivani_categories,
} as {
   [key: string]: GameCardData[];
};
