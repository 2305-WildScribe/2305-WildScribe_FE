import './AdventureContainer.scss';
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';
import { useAdventures } from '../../Context/AdventureContext'

interface AdventureContainerProps {
  adventures: Adventure[];
}

function AdventureContainer({
  adventures,
}: AdventureContainerProps): React.ReactElement {

  // const {adventures} = useAdventures();

  console.log("adventures",adventures)

  function sortByDateAscending(adventures: Adventure[]) {
    return adventures.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const sortedAdventures = sortByDateAscending(adventures);

  const adventureCards = sortedAdventures.map((adventure) => {
    console.log('date -->', typeof adventure.date);
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard
          adventure={adventure}
          adventures={adventures}
        />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;
