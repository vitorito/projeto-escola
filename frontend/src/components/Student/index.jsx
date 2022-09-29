/* eslint-disable react/prop-types */
import { get } from 'lodash';
import { useState } from 'react';
import { FaEdit, FaExclamation, FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Loading from '../Loading';
import ProfilePicture from '../ProfilePicture';
import { StudentContainer } from './styled';

export default function Student({ student, remove }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteConfirmation = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.delete(`/students/${student.id}`);
      remove();
      setIsLoading(false);
    } catch (err) {
      const errorMessage = get(
        err,
        'response.data.message',
        'An error ocurred'
      );
      toast.error(errorMessage.toString());
      setIsLoading(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleEdit = () => {
    navigate(`/students/${student.id}/edit`, { state: { student } });
  };

  return (
    <StudentContainer>
      <Loading isLoading={isLoading} />
      <ProfilePicture src={student.profilePicUrl} size={40} />
      <span className="name">{student.name}</span>
      <span className="email">{student.email}</span>
      <span className="enrollment">{student.enrollment}</span>
      <span className="age">{student.age}</span>
      <div className="student-buttons">
        <FaEdit size={20} className="edit-button" onClick={handleEdit} />
        <FaWindowClose size={18} onClick={handleDelete} />
        <FaExclamation
          onClick={handleDeleteConfirmation}
          display="none"
          style={{
            border: '2px solid red',
            borderRadius: '50%',
            color: 'red',
          }}
        />
      </div>
    </StudentContainer>
  );
}
