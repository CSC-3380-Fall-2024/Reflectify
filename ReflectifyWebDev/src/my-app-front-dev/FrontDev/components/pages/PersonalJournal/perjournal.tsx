import React, { useState, useEffect } from 'react';
import './perjournal.css';
import { JournalService } from '../../services/JournalService'; 
import { JournalEntry } from '../../types/JournalTypes'; 

const PersonalJournal: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [entry, setEntry] = useState<string>('');
  const [entries, setEntries] = useState<JournalEntry[]>([]); 
  const [error,setError] = useState<string | null>(null);

  const userID = Number(localStorage.getItem('userId'));

  useEffect(() => {
  const fetchEntries = async () => {
    try {
      const fetchedEntries = await JournalService.getAllEntries(userID); 
      setEntries(fetchedEntries); 
    } 
    catch (error) {
      console.error('Error fetching entries:', error);
      setError('Failed to fetch entries. Please try again later.');
      }
    };

    fetchEntries();
  }, [userID]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
   setEntry(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value); 
    };

  const handleSave = async () => {
   if (entry.trim()) {
    try {
          const newEntry = await JournalService.createEntry({ user: userID, title, content: entry }); 
        console.log('New Entry:', newEntry);
        setEntries([...entries, newEntry]); 
        setEntry(''); 
        setTitle('');
        setError(null);
      } catch (error) {
        console.error('Error saving entry:', error);
        setError('Failed to save entry. Please try again');
      }
    }
    else{
      setError('Title & content cannot be empty');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await JournalService.deleteEntry(id); 
      setEntries(entries.filter(entry => entry.id !== id)); 
    } catch (error) {
      console.error('Error deleting entry:', error);
      setError('Failed to delete entry. Please try again');
    }
  };

  return (
    <div className="container"> 
    <h1>Personal Journal</h1>
     {error && <p className="error-message">{error}</p>}
     <input
       type="text"
        className="title-input"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title of your entry"
      />
        <textarea
        className="text-area"
        value={entry}
        onChange={handleChange}
        placeholder="What are you feeling today? Write your expressions here..."
      />
      <button className="button" onClick={handleSave}> 
        Save Entry
      </button>
      <div className="entries-container"> 
        <h2>Your Entries:</h2>
        {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="entry"> 
          <h3>{entry.title}</h3>
            <p>{entry.content}</p>
              <button className="delete-button" onClick={() => handleDelete(entry.id)}>Delete</button>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonalJournal;