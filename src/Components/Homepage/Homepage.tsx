import './Homepage.scss';
import  Adventure  from '../../../types';
import AdventureContainer from '../AdventureContainer/AdventureContainer';

interface HomepageProps {
  adventures: Adventure[];
}

function Homepage({ adventures }: HomepageProps): React.ReactElement {
  return (
      <div id='home-main'>
        <button className='search-btn'>Search Logs</button>
        <AdventureContainer adventures={adventures} />
      </div>
  );
}

export default Homepage;
