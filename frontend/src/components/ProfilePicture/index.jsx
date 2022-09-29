import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { Avatar } from './styled';

export default function ProfilePicture({ src, size }) {
  let profilePicture = <FaUserCircle size={size} />;

  if (src) {
    profilePicture = <img src={src} alt="Profile" />;
  }

  return <Avatar width={size}>{profilePicture}</Avatar>;
}

ProfilePicture.defaultProps = {
  src: '',
};

ProfilePicture.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number.isRequired,
};
