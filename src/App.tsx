import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Auth from './pages/Auth';
import Detail from './pages/Detail';
const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<></>} />
      <Route path={ROUTES.NOT_FOUND} element={<></>} />
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route path={ROUTES.SEARCH} element={<></>} />
      <Route path={ROUTES.CREATE_POST} element={<></>} />
      <Route path={ROUTES.MY_PROFILE} element={<></>} />
      <Route path={ROUTES.USER_EDIT} element={<></>} />
      <Route path={ROUTES.USER_PROFILE} element={<></>} />
      <Route path={ROUTES.USER_LIST} element={<></>} />
      <Route path={ROUTES.CHAT_LIST} element={<></>} />
      <Route path={ROUTES.CHAT} element={<></>} />
      <Route path={ROUTES.DETAIL} element={<Detail />} />
    </Routes>
  );
};

export default App;
