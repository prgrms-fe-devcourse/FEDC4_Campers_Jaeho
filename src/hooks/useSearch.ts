import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const navigate = useNavigate();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setKeyword('');
    navigate(`/search/${keyword}`);
  };

  return { keyword, handleChange, handleSubmit };
};
