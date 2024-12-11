export interface MoodQuestion {
  user: number;
  question_text: string;
  options: string[];
  category: string;
}


export interface MoodResponse {
  user: number;
  question: number;
  answer: number;
  response_date: string;
}


export interface MoodLog {
  user: number;
  score: number;
  log_date: string;
}