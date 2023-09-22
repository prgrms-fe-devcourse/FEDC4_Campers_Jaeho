import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/storage';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getLocalStorage('token');

    if (typeof userToken === 'string' && userToken.trim().length) {
      history.replaceState(null, '', '/');
      navigate('/');
    }
  }, []);
};

export default useAuthCheck;
