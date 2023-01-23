import { Link } from 'react-router-dom';

export default function to(link: string) {
   return { component: Link, to: link };
}
