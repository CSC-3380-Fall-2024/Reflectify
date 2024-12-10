import axios from "axios";
import { MoodQuestion, MoodResponse, MoodLog } from "../types/moodtracker";

const API_URL = "'http://localhost:8000/api/moodtracker/'";


export const fetchMoodQuestions = async (): Promise<MoodQuestion[]> => {
  const response = await axios.get(`${API_URL}/moodquestion/`);
  return response.data;
};


export const fetchMoodResponses = async (): Promise<MoodResponse[]> => {
  const response = await axios.get(`${API_URL}/moodresponse/`);
  return response.data;
};


export const createMoodResponse = async (data: Omit<MoodResponse, "user">): Promise<MoodResponse> => {
  const response = await axios.post(`${API_URL}/moodresponse/`, data);
  return response.data;
};


export const fetchMoodLogs = async (): Promise<MoodLog[]> => {
  const response = await axios.get(`${API_URL}/moodlog/`);
  return response.data;
};


export const createMoodLog = async (data: Omit<MoodLog, "user">): Promise<MoodLog> => {
  const response = await axios.post(`${API_URL}/moodlog/`, data);
  return response.data;
};


export const fetchLatestMoodLog = async (): Promise<MoodLog | null> => {
  const response = await axios.get(`${API_URL}/moodlog/latest/`);
  return response.data;
};