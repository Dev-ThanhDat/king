import { FaWindowClose } from 'react-icons/fa';
import { FaRegChessKing } from 'react-icons/fa6';
import { MdLogin, MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiLogout } from '~/api/config';
import { doLogoutAction } from '~/app/account/slice';
import { closeToggle } from '~/app/ToggleSidebar/ToggleSidebarSlice';
import { menu } from '~/utils/menu';

const styleMenu =
  'relative flex items-center h-10 gap-x-5 after:absolute after:right-0 after:w-1 after:h-full after:bg-color-red after:transition-all after:rounded-md after:scale-y-0 hover:after:scale-y-100';

const Sidebar = () => {
  const { toggle } = useSelector((state) => state.ToggleSidebarReducer);
  const { isLogged, user } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseToggle = () => {
    dispatch(closeToggle());
  };

  const handleLogout = async () => {
    const response = await apiLogout();
    if (response?.success === true) {
      dispatch(doLogoutAction());
      navigate('/');
      toast.success(response.message);
    }
  };

  return (
    <aside
      className={`bg-white overflow-hidden gap-y-[40px] justify-between lg:max-w-[240px] w-full flex-col items-center fixed top-0 z-50 left-0 bottom-0 shadow-lg py-[15px] flex transition-all ${
        toggle ? '-translate-x-0' : '-translate-x-full lg:-translate-x-0'
      }`}
    >
      <div className='mt-5 lg:mt-0'>
        <Link
          to={'/'}
          className='flex items-stretch text-3xl font-semibold gap-x-[10px]'
        >
          <FaRegChessKing />
          <span>King</span>
        </Link>
      </div>

      <ul className='w-full '>
        {menu &&
          menu.length > 0 &&
          menu
            .filter((item) => !(item.name === 'Profile' && !isLogged))
            .map((item) => (
              <li
                key={item.id}
                onClick={handleCloseToggle}
                className='py-[10px] pl-[20px]'
              >
                <NavLink
                  to={
                    item?.name === 'Profile'
                      ? `${item.path}/${user}`
                      : item.path
                  }
                  className={({ isActive }) =>
                    isActive
                      ? `${styleMenu} after:scale-y-100 font-bold transition-all`
                      : `${styleMenu}`
                  }
                >
                  <span
                    className={`flex items-center justify-center w-10 transition-all h-full ${
                      item?.name === 'Profile'
                        ? 'rounded-full bg-color-bg text-white'
                        : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className='text-base'>{item.name}</span>
                </NavLink>
              </li>
            ))}
      </ul>

      <div className='flex flex-col items-center w-full px-5 gap-y-5'>
        <span
          onClick={handleCloseToggle}
          className='lg:hidden'
        >
          <FaWindowClose size={30} />
        </span>

        {isLogged ? (
          <button
            onClick={handleLogout}
            className='flex items-center gap-x-[10px] bg-color-black w-full text-white justify-center py-[7px] px-[10px] font-semibold rounded-lg border border-color-black hover:bg-opacity-90 transition-all'
          >
            <span>
              <MdOutlineLogout size={25} />
            </span>
            <span>Log out</span>
          </button>
        ) : (
          <Link
            to={'login'}
            onClick={handleCloseToggle}
            className='flex items-center gap-x-[10px] bg-color-red w-full text-white justify-center py-[7px] px-[10px] font-semibold rounded-lg border border-color-red hover:bg-transparent hover:text-color-black transition-all hover:border-color-black'
          >
            <span>
              <MdLogin size={25} />
            </span>
            <span>Log in</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
