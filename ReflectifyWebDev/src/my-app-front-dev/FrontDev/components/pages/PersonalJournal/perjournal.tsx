import React, { useState, useEffect } from 'react';
import './perjournal.css';
import { JournalService } from '../../services/JournalService';
import { JournalEntry } from '../../types/JournalTypes';
import axios from 'axios';

// Axios Instance with Interceptors
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Ensure the backend URL is correct
});

// Request Interceptor to Add Authorization Header
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

// Response Interceptor for Token Refresh
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
          localStorage.setItem('accessToken', data.access); // Save the new access token
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`; // Attach the new token
          return api(originalRequest); // Retry the original request
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError);
          localStorage.clear(); // Clear the tokens on failure
          window.location.href = '/login'; // Redirect to login
        }
      }
    }
    return Promise.reject(error);
  }
);

const PersonalJournal: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Fetch entries from backend when component loads
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await api.get<JournalEntry[]>('/journal/');
        setEntries(response.data);
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
        const response = await api.post<JournalEntry>('/journal/', { content: entry });
        setEntries([...entries, response.data]); // Add the new entry to the list
        setEntry(''); // Clear the textarea
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/journal/${id}/`); // Delete entry
      setEntries(entries.filter((entry) => entry.id !== id)); // Remove from state
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
