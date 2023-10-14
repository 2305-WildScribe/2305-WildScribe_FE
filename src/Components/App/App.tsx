import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postAdventure from '../../apiCalls';
import  Adventure  from '../../../types';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';

function App(): React.ReactElement {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  const logNewAdventure = (newAdventureData: Adventure) => {
      setAdventures([...adventures, newAdventureData])
  }


  useEffect(() => {
    postAdventure().then((data) => {
      setAdventures(data.data[0].attributes as Adventure[]);
    });
  }, []);

  return (
    <div className='App'>
      <NavBar />
      <div className='main'>
        <div className='inner-main'>
          <Routes>
            <Route path='/' element={<Homepage adventures={adventures} />} />
            <Route path='/logAdventure' element={<LogAdventureForm logNewAdventure={logNewAdventure}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
