import React, { useState } from 'react';

const PersonalJournal: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [entries, setEntries] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntry(event.target.value);
  };

  const handleSave = () => {
    if (entry.trim()) {
      setEntries([...entries, entry]);
      setEntry(''); // Clear the text area after saving
    }
  };

  return (
    <div style={styles.container}>
      <h1>Personal Journal</h1>
      <textarea
        style={styles.textArea}
        value={entry}
        onChange={handleChange}
        placeholder="What are you feeling today? Write your expressions here..."
      />
      <button style={styles.button} onClick={handleSave}>
        Save Entry
      </button>
      <div style={styles.entriesContainer}>
        <h2>Your Entries:</h2>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} style={styles.entry}>
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Explicitly type the styles object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Use type assertion here
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
  },
  textArea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6200ea',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  entriesContainer: {
    marginTop: '20px',
    width: '100%',
  },
  entry: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
};

export default PersonalJournal;