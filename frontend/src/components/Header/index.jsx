import {
  FaEdit,
  FaHome,
  FaPowerOff,
  FaSignInAlt,
  FaUser,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import actions from '../../store/modules/auth/actions';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogoff = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
  };

  return (
    <Nav>
      {isLoggedIn ? (
        <>
          <NavLink to="/" about="home">
            <FaHome size={22} />
          </NavLink>
          <NavLink to="/edit">
            <FaEdit size={22} />
          </NavLink>
          <NavLink to="/login" onClick={handleLogoff}>
            <FaPowerOff size={22} color="#fff" />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">
            <FaUser size={22} />
          </NavLink>

          <NavLink to="/register">
            <FaSignInAlt size={22} />
          </NavLink>
        </>
      )}
    </Nav>
  );
}
