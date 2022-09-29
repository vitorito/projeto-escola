import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ClosedRoute({ component: Component }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ prevPath: location.pathname }} />;
  }

  return Component;
}

ClosedRoute.propTypes = {
  component: Proptypes.element.isRequired,
};
