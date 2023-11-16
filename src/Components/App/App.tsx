import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';
import LoginPage from '../LoginPage/LoginPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import EditLogForm from '../EditLogForm/EditLogForm';
import { useEffect } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { selectUser } from '../../Redux/slices/userSlice';

function App(): React.ReactElement {
  const isLoggedIn = useAppSelector(selectUser).isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
      <div className='App'>
        <NavBar />
        <main className='main'>
          <div className='inner-main'>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/home' element={<Homepage />} />
              <Route path='/logAdventure' element={<LogAdventureForm />} />
              <Route path={'/edit'} element={<EditLogForm />} />
              <Route path='/error' element={<ErrorPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
      </div>
  );
}

export default App;
