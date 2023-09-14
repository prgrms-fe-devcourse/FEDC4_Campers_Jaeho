import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Main from './pages/Main';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Create from './pages/Create';
const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.SEARCH} element={<></>} />
        <Route path={ROUTES.CREATE_POST} element={<Create />} />
        <Route path={ROUTES.MY_PROFILE} element={<></>} />
        <Route path={ROUTES.USER_EDIT} element={<></>} />
        <Route path={ROUTES.USER_PROFILE} element={<></>} />
        <Route path={ROUTES.USER_LIST} element={<></>} />
        <Route path={ROUTES.CHAT_LIST} element={<></>} />
        <Route path={ROUTES.CHAT} element={<></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
