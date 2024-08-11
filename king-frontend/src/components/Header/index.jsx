import { FaRegChessKing } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { openToggle } from '~/app/ToggleSidebar/ToggleSidebarSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleOpenToggle = () => {
    dispatch(openToggle());
  };

  return (
    <div className='flex lg:hidden h-[60px] overflow-hidden bg-white items-center px-[15px] justify-between'>
      <Link
        to={'/'}
        className='flex items-stretch text-2xl font-semibold gap-x-[10px]'
      >
        <FaRegChessKing />
        <span>King</span>
      </Link>

      <span onClick={handleOpenToggle}>
        <FaBars size={25} />
      </span>
    </div>
  );
};

export default Header;
