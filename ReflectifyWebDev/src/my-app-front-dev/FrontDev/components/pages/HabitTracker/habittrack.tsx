import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { HabitService } from '../../services/HabitService'; 
import { Habit } from '../../types/HabitTypes'; 
import './habittrack.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<string>('');


  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const habitsData = await HabitService.getAllHabits();
      const updatedHabits = habitsData.map(habit => ({
        ...habit,
        completedDays: new Set<string>(), 
        streak: 0, 
      }));
      setHabits(updatedHabits);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const markHabitAsCompleted = async (habitId: number) => {
    const date = new Date().toISOString().split('T')[0]; 
    try {
      await HabitService.createHabitLog(habitId, { date, progress: 1 });
      setHabits(prevHabits =>
        prevHabits.map(habit => {
          if (habit.id === habitId) {
            const updatedDays = new Set(habit.completedDays);
            updatedDays.add(date);

            const newStreak = updatedDays.size > (habit.streak || 0) ? updatedDays.size : habit.streak;
            return { ...habit, completedDays: updatedDays, streak: newStreak };
          }
          return habit;
        })
      );
    } catch (error) {
      console.error('Error marking habit as completed:', error);
    }
  };

  const addHabit = async () => {
    if (newHabit.trim() === '') return;
    try {
      const newHabitData = await HabitService.createHabit({ name: newHabit, target: 1, frequency: 'daily' });
      const habitWithDefaults: Habit = {
        ...newHabitData,
        completedDays: new Set<string>(), 
        streak: 0,
      };
      setHabits(prev => [...prev, habitWithDefaults]);
      setNewHabit('');
    } catch (error) {
      console.error('Error adding new habit:', error);
    }
  };

  const getChartData = () => {
    return habits.map(habit => habit.completedDays ? habit.completedDays.size : 0);
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