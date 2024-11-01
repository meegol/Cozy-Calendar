import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import Calendar from './components/Calendar';
import ReminderList from './components/ReminderList';
import ReminderForm from './components/ReminderForm';
import type { Reminder } from './types/reminder';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleSaveReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
  };

  const handleToggleComplete = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CalendarIcon size={32} className="text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Cozy Reminders</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={20} />
            New Reminder
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Calendar
            selectedDate={selectedDate}
            reminders={reminders}
            onDateSelect={setSelectedDate}
          />
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ReminderList
              date={selectedDate}
              reminders={reminders}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteReminder}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <ReminderForm
          selectedDate={selectedDate}
          onSave={handleSaveReminder}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;