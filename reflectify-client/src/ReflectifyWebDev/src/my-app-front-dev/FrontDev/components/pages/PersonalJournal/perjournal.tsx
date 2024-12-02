import React, { useState, useEffect } from 'react';
import './perjournal.css';
import { JournalService } from '../../services/JournalService'; 
import { JournalEntry } from '../../types/JournalTypes'; 

const PersonalJournal: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [entries, setEntries] = useState<JournalEntry[]>([]); // Use JournalEntry type

  // Fetch entries from backend when component loads
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await JournalService.getAllEntries(); 
        setEntries(fetchedEntries); 
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntry(event.target.value);
  };

  const handleSave = async () => {
    if (entry.trim()) {
      try {
        const newEntry = await JournalService.createEntry({ title: 'New Entry', content: entry }); // Save entry to backend
        setEntries([...entries, newEntry]); // Add new entry to the state
        setEntry(''); // Clear the text area
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await JournalService.deleteEntry(id); // Delete entry from backend
      setEntries(entries.filter(entry => entry.id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="container"> 
      <h1>Personal Journal</h1>
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