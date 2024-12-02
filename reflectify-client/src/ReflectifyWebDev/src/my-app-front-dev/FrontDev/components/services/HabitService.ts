import axios from 'axios';
import { Habit, HabitLog } from '../types/HabitTypes';

const API_URL = 'http://localhost:8000/api/habittracker/';

export const HabitService = {
  getAllHabits: async (): Promise<Habit[]> => {
    try {
      const response = await axios.get<Habit[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw new Error('Failed to fetch habits.');
    }
  },

  createHabit: async (habitData: { name: string; target: number; frequency: 'daily' | 'weekly' | 'monthly' }): Promise<Habit> => {
    try {
      const response = await axios.post<Habit>(API_URL, habitData);
      return response.data;
    } catch (error) {
      console.error('Error creating habit:', error);
      throw new Error('Failed to create habit.');
    }
  },

  updateHabit: async (id: number, habitData: { name?: string; target?: number; frequency?: 'daily' | 'weekly' | 'monthly' }): Promise<Habit> => {
    try {
      const response = await axios.put<Habit>(`${API_URL}${id}/`, habitData);
      return response.data;
    } catch (error) {
      console.error('Error updating habit:', error);
      throw new Error('Failed to update habit.');
    }
  },

  deleteHabit: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}${id}/`);
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw new Error('Failed to delete habit.');
    }
  },

  getHabitLogs: async (habitId: number): Promise<HabitLog[]> => {
    try {
      const response = await axios.get<HabitLog[]>(`${API_URL}${habitId}/logs/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching habit logs:', error);
      throw new Error('Failed to fetch habit logs.');
    }
  },

  createHabitLog: async (habitId: number, logData: { date: string; progress: number }): Promise<HabitLog> => {
    try {
      const response = await axios.post<HabitLog>(`${API_URL}${habitId}/logs/`, logData);
      return response.data;
    } catch (error) {
      console.error('Error creating habit log:', error);
      throw new Error('Failed to create habit log.');
    }
  },

  updateHabitLog: async (logId: number, logData: { date?: string; progress?: number }): Promise<HabitLog> => {
    try {
      const response = await axios.put<HabitLog>(`${API_URL}logs/${logId}/`, logData);
      return response.data;
    } catch (error) {
      console.error('Error updating habit log:', error);
      throw new Error('Failed to update habit log.');
    }
  },

  deleteHabitLog: async (logId: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}logs/${logId}/`);
    } catch (error) {
      console.error('Error deleting habit log:', error);
      throw new Error('Failed to delete habit log.');
    }
  },
};