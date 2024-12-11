import React, { useState, useEffect } from 'react';
import './perjournal.css';
import { JournalEntry } from '../../types/JournalTypes';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await api.post('/auth/token/refresh/', { refresh: refreshToken });
          localStorage.setItem('accessToken', data.access);
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError);
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

const PersonalJournal: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await api.get<JournalEntry[]>('/journal/');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }

      const localEntries = localStorage.getItem('localJournalEntries');
      if (localEntries) {
        setEntries((prevEntries) => [...prevEntries, ...JSON.parse(localEntries)]);
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
        const response = await api.post<JournalEntry>('/journal/', { content: entry });
        const newEntry = response.data;
  
        console.log('Response from server:', newEntry);
  
        
        if (newEntry.id && newEntry.content) {
          setEntries((prevEntries) => [...prevEntries, newEntry]);
          setEntry('');
  
          const localEntries = localStorage.getItem('localJournalEntries');
          const updatedLocalEntries = localEntries ? [...JSON.parse(localEntries), newEntry] : [newEntry];
          localStorage.setItem('localJournalEntries', JSON.stringify(updatedLocalEntries));
  
          console.log('Updated local entries:', updatedLocalEntries);
        } else {
          console.error('Incomplete entry data received from server:', newEntry);
        }
      } catch (error) {
        console.error('Error saving entry to server:', error);
  
        const localEntries = localStorage.getItem('localJournalEntries');
        const newLocalEntry: JournalEntry = {
          id: Date.now(), 
          content: entry,
          title: '', 
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
  
        setEntries((prevEntries) => [...prevEntries, newLocalEntry]);
        setEntry('');
  
        const updatedLocalEntries = localEntries ? [...JSON.parse(localEntries), newLocalEntry] : [newLocalEntry];
        localStorage.setItem('localJournalEntries', JSON.stringify(updatedLocalEntries));
  
        console.log('Saved entry locally:', newLocalEntry);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/journal/${id}/`);
      setEntries(entries.filter((entry) => entry.id !== id));

      const localEntries = localStorage.getItem('localJournalEntries');
      if (localEntries) {
        const updatedLocalEntries = JSON.parse(localEntries).filter((entry: JournalEntry) => entry.id !== id);
        localStorage.setItem('localJournalEntries', JSON.stringify(updatedLocalEntries));
      }
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
              <button className="delete-button" onClick={() => handleDelete(entry.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonalJournal;