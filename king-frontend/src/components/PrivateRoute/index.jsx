import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isLogged, user } = useSelector((state) => state.authReducer);

  return isLogged && user !== null && user.length > 0 ? (
    children
  ) : (
    <Navigate
      to='/login'
      replace
    />
  );
};

export default PrivateRoute;
