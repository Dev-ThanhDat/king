import { FaHome } from 'react-icons/fa';
import { MdOutlineImageSearch } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { FaSmile } from 'react-icons/fa';

export const menu = [
  {
    id: 1,
    path: '/',
    name: 'Home',
    icon: <FaHome size={25} />
  },
  {
    id: 2,
    path: '/search',
    name: 'Search',
    icon: <MdOutlineImageSearch size={25} />
  },
  {
    id: 3,
    path: '/create',
    name: 'Create',
    icon: <FaPlus size={25} />
  },
  {
    id: 4,
    path: '/profile',
    name: 'Profile',
    icon: <FaSmile size={30} />
  }
];
