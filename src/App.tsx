import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';

const App = () => {
  return (
    <div>
      <h1>hello world</h1>
      <Routes>
        <Route path={ROUTES.MAIN} element={<></>} />
        <Route path={ROUTES.NOT_FOUND} element={<></>} />
        <Route path={ROUTES.LOGIN} element={<></>} />
        <Route path={ROUTES.SIGNUP} element={<></>} />
        <Route path={ROUTES.SEARCH} element={<></>} />
        <Route path={ROUTES.CREATE_POST} element={<></>} />
        <Route path={ROUTES.MY_PROFILE} element={<></>} />
        <Route path={ROUTES.USER_EDIT} element={<></>} />
        <Route path={ROUTES.USER_PROFILE} element={<></>} />
        <Route path={ROUTES.USER_LIST} element={<></>} />
        <Route path={ROUTES.CHAT_LIST} element={<></>} />
        <Route path={ROUTES.CHAT} element={<></>} />
      </Routes>
    </div>
  );
};

export default App;
