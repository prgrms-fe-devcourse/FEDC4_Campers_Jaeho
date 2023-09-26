import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Main from './pages/Main';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import CreatePost from './pages/CreatePost';
import UserProfile from './pages/UserProfile';
import Detail from './pages/Detail';
import Search from './pages/Search';

const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.SEARCH} element={<Search />}>
          <Route path=":keyword" element={<Search />} />
        </Route>
        <Route path={ROUTES.CREATE_POST} element={<CreatePost />} />
        <Route path={ROUTES.USER_EDIT} element={<></>} />
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
        <Route path={ROUTES.DETAIL} element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
