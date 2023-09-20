import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword('');
    navigate(`/search/${keyword}`);
  };

  return { keyword, handleChange, handleSubmit };
};
