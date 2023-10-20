import './EditLogForm.scss';
import { Adventure, Error } from '../../types';
import { useState, ChangeEvent } from 'react';
import { editLog } from '../../apiCalls';
import { useNavigate } from 'react-router-dom';

interface EditLogFormProps {
  singleAdventure: Adventure | undefined;
  setSingleAdventure: React.Dispatch<
    React.SetStateAction<Adventure | undefined>
  >;
  adventures: Adventure[];
  setAdventures: React.Dispatch<React.SetStateAction<Adventure[]>>;
  error: Error;
  setError: React.Dispatch<React.SetStateAction<Error>>;
  loading: boolean;
}

function EditLogForm({
  adventures,
  setAdventures,
  setError,
  setSingleAdventure,
  singleAdventure,
}: EditLogFormProps): React.ReactElement {
  const [updatedActivity, setUpdatedActivity] = useState<string>(
    singleAdventure ? singleAdventure.activity : ''
  );
  const [updatedDate, setUpdatedDate] = useState<string | null>(
    singleAdventure ? singleAdventure.date : null
  );
  const [updatedBetaNotes, setUpdatedBetaNotes] = useState<string>(
    singleAdventure ? singleAdventure.beta_notes : ''
  );
  const [updatedImage_url, setUpdatedImage] = useState<string>(
    singleAdventure ? singleAdventure.image_url : ''
  );
  const [updatedStress_level, setUpdatedStressLevel] = useState<string>(
    singleAdventure ? singleAdventure.stress_level : ''
  );
  const [updatedHydration, setUpdatedHydration] = useState<string>(
    singleAdventure ? singleAdventure.hydration : ''
  );
  const [updatedDiet, setUpdatedDiet] = useState<string>(
    singleAdventure ? singleAdventure.diet : ''
  );
  const [updatedExtraSleepNotes, setUpdatedExtraSleepNotes] = useState<string>(
    singleAdventure ? singleAdventure.sleep_stress_notes : ''
  );
  const [updatedExtraDietNotes, setUpdatedExtraDietNotes] = useState<string>(
    singleAdventure ? singleAdventure.diet_hydration_notes : ''
  );
  const [updatedSleep, setUpdatedSleep] = useState<number>(
    singleAdventure ? singleAdventure.hours_slept : 0
  );

  const [userMsg, setUserMsg] = useState<string>('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue: string = event.target.value;
    setUpdatedDate(selectedDateValue);
  };

  const navigate = useNavigate();

  const handleSaveChanges = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedLog: Adventure = {
      user_id: singleAdventure?.user_id || null,
      adventure_id: singleAdventure?.adventure_id || undefined,
      activity: updatedActivity || '',
      date: updatedDate || '',
      image_url: updatedImage_url || '',
      stress_level: updatedStress_level || '',
      hours_slept: updatedSleep || 0,
      sleep_stress_notes: updatedExtraSleepNotes || '',
      hydration: updatedHydration || '',
      diet: updatedDiet || '',
      diet_hydration_notes: updatedHydration || '',
      beta_notes: updatedBetaNotes || '',
    };

    editLog(updatedLog)
      .then((response) => {
        console.log('resposne', response);
        const filterAdventures = adventures.filter(
          (adventure) => adventure.adventure_id !== updatedLog.adventure_id
        );
        // setAdventures(filterAdventures);
        setAdventures([...filterAdventures, updatedLog]);
        setError({ error: false, message: '' });
        navigate('/home');
      })
      .catch((error) => {
        setError({
          error: true,
          message: 'Oops, something went wront, please try again later',
        });
        navigate('/error');
      });

    setSingleAdventure(undefined);
  };

  return (
    <form className='form'>
      <div className='top-line-components'>
        <div>
          <label htmlFor='activity-input'>Activity:</label>
          <input
            type='text'
            name='activity'
            value={updatedActivity}
            onChange={(event) => setUpdatedActivity(event.target.value)}
          />
          <label htmlFor='date-input'>Date:</label>
          <input
            type='date'
            name='date'
            value={updatedDate || ''}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
          />
          <label htmlFor='image'>Add Image:</label>
          <input
            type='text'
            name='image'
            value={updatedImage_url}
            onChange={(event) => setUpdatedImage(event.target.value)}
            placeholder='Enter the image URL'
          />
        </div>
        <div className='form-btn-wrapper'>
          {userMsg !== '' && <p>{userMsg}</p>}
          <button
            className='submit-button'
            onClick={(event) => handleSaveChanges(event)}
          >
            Save Changes
          </button>
        </div>
      </div>
      <p>Over the last 48 hours, how would you describe the following:</p>
      <div className='second-line-components'>
        <select
          name='stressLevel'
          value={updatedStress_level}
          onChange={(event) => setUpdatedStressLevel(event.target.value)}
        >
          <option value=''>Stress Level:</option>
          <option value='Min'>No stress</option>
          <option value='Low'>Low</option>
          <option value='Moderate'>Moderate</option>
          <option value='High'>High</option>
          <option value='Max'>Max</option>
        </select>
        <select
          name='updatedHydration'
          value={updatedHydration}
          onChange={(event) => setUpdatedHydration(event.target.value)}
        >
          <option value=''>updatedHydration Level:</option>
          <option value='Dehydrated'>Dehydrated</option>
          <option value='Somewhat Hydrated'>Somewhat Hydrated</option>
          <option value='Hydrated'>Hydrated</option>
          <option value='Very Hydrated'>Very Hydrated</option>
        </select>
        <select
          name='diet'
          value={updatedDiet}
          onChange={(event) => setUpdatedDiet(event.target.value)}
        >
          <option value=''>Overall Diet:</option>
          <option value='Poor'>Poor</option>
          <option value='Average'>Average</option>
          <option value='Good'>Good</option>
        </select>
        <div>
          <label htmlFor='sleep-input'>Hours slept / night:</label>
          <input
            type='number'
            name='sleep'
            value={updatedSleep}
            onChange={(event) => {
              const inputValue = Number(event.target.value);
              if (inputValue >= 0) {
                setUpdatedSleep(inputValue);
              }
            }}
            min='0'
          />
        </div>
      </div>
      <textarea
        className='sleep-notes-input'
        placeholder='Add any extra notes on sleep or stress'
        name='notes'
        value={updatedExtraSleepNotes}
        onChange={(event) => setUpdatedExtraSleepNotes(event.target.value)}
      />
      <textarea
        className='hydro-notes-input'
        placeholder='Add any extra notes on diet or updatedHydration'
        name='notes'
        value={updatedExtraDietNotes}
        onChange={(event) => setUpdatedExtraDietNotes(event.target.value)}
      />
      <textarea
        className='notes-input'
        placeholder='Add any extra notes on any beta '
        name='notes'
        value={updatedBetaNotes}
        onChange={(event) => setUpdatedBetaNotes(event.target.value)}
      />
    </form>
  );
}

export default EditLogForm;
