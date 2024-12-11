import axiosInstance from './AxiosInstance'; 
import { JournalEntry } from '../types/JournalTypes';

const API_URL = 'http://localhost:8000/api/journal/';

export const JournalService = {
  getAllEntries: async (userId: number): Promise<JournalEntry[]> => {
    try {
      const response = await axiosInstance.get<JournalEntry[]>(`${API_URL}?user=${userId}`); 
      return response.data;
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw new Error('Failed to fetch journal entries.');
    }
  },

  createEntry: async (entryData: { user: number; title: string; content: string }): Promise<JournalEntry> => {
    try {
      const response = await axiosInstance.post<JournalEntry>(API_URL, entryData);
      return response.data;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw new Error('Failed to create journal entry.');
    }
  },

  updateEntry: async (id: number, entryData: { title: string; content: string }): Promise<JournalEntry> => {
    try {
      const response = await axiosInstance.put<JournalEntry>(`${API_URL}${id}/`, entryData);
      return response.data;
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw new Error('Failed to update journal entry.');
    }
  },

  deleteEntry: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}${id}/`);
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw new Error('Failed to delete journal entry.');
    }
  },
};