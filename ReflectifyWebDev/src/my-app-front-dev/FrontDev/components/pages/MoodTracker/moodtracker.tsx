import React, { useState } from 'react';
import { Question, MoodResponse } from './types';
import { questions } from './questions';
import './moodtrack.css';

const MoodTracker: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState<MoodResponse | null>(null);

    const handleAnswerClick = (score: number) => {
        // Add the selected score to answers array
        setAnswers([...answers, score]);

        // Move to the next question or submit answers if it's the last question
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitAnswers([...answers, score]);
        }
    };

    const submitAnswers = async (finalAnswers: number[]) => {
        try {
            const response = await fetch('http://localhost:8000/api/calculate-mood/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers })
            });

            const data: MoodResponse = await response.json();
            setResult(data); // Store the response (mood and score)
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    return (
        <div className="mood-tracker">
            {result ? (
                <div className="result-container">
                    <h2>Your Mood</h2>
                    <p className="result-info">
                        Mood: <span>{result.mood}</span>
                    </p>
                    <p className="result-info">
                        Score: <span>{result.score}</span>
                    </p>
                </div>
            ) : (
                <div className="question-container">
                    <h2>{questions[currentQuestionIndex].text}</h2>
                    <div className="button-group">
                        {[1, 2, 3, 4, 5].map((score) => (
                            <button
                                key={score}
                                className="answer-button"
                                onClick={() => handleAnswerClick(score)}
                            >
                                {score}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoodTracker;