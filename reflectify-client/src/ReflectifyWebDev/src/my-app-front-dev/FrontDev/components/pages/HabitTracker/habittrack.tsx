import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './habittrack.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDays: Set<string>; // Store dates as strings (e.g., '2024-11-22')
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Exercise', streak: 0, completedDays: new Set() },
    { id: '2', name: 'Read', streak: 0, completedDays: new Set() },
  ]);

  const [newHabit, setNewHabit] = useState<string>('');

  const markHabitAsCompleted = (habitId: string) => {
    const date = new Date().toISOString().split('T')[0]; // Get today's date
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const updatedDays = new Set(habit.completedDays);
          updatedDays.add(date);

          const newStreak = updatedDays.size > habit.streak ? updatedDays.size : habit.streak;
          return { ...habit, completedDays: updatedDays, streak: newStreak };
        }
        return habit;
      })
    );
  };

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    setHabits(prev => [
      ...prev,
      { id: (prev.length + 1).toString(), name: newHabit, streak: 0, completedDays: new Set() },
    ]);
    setNewHabit('');
  };

  const getChartData = () => {
    return habits.map(habit => habit.completedDays.size);
  };

  return (
    <div className="habit-tracker-container">
      <h1 className="title">Habit Tracker</h1>
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Add a new habit"
        className="habit-input"
      />
      <button onClick={addHabit} className="add-habit-button">
        Add Habit
      </button>

      <div className="habits-grid">
        {habits.map(habit => (
          <div key={habit.id} className="habit-card">
            <h3 className="habit-name">{habit.name}</h3>
            <p className="habit-streak">Streak: {habit.streak} days</p>
            <button
              onClick={() => markHabitAsCompleted(habit.id)}
              className="mark-completed-button"
            >
              Mark as Completed
            </button>
          </div>
        ))}
      </div>

      <h2 className="progress-title">Progress Chart</h2>
      <Bar
        data={{
          labels: habits.map(habit => habit.name),
          datasets: [
            {
              label: 'Days Completed',
              data: getChartData(),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Habit Completion Progress',
            },
          },
        }}
      />
    </div>
  );
};

export default HabitTracker;