import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Reminder } from '../types/reminder';

interface ReminderListProps {
  date: Date;
  reminders: Reminder[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ReminderList({
  date,
  reminders,
  onToggleComplete,
  onDelete,
}: ReminderListProps) {
  const dayReminders = reminders.filter(
    (reminder) => reminder.date === format(date, 'yyyy-MM-dd')
  );

  if (dayReminders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No reminders for {format(date, 'MMMM d, yyyy')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {dayReminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-3"
        >
          <button
            onClick={() => onToggleComplete(reminder.id)}
            className="mt-1 text-gray-400 hover:text-orange-500 transition-colors"
          >
            {reminder.completed ? (
              <CheckCircle2 size={20} className="text-orange-500" />
            ) : (
              <Circle size={20} />
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3
                className={`font-medium ${
                  reminder.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {reminder.title}
              </h3>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: reminder.color }}
              />
            </div>
            {reminder.time && (
              <p className="text-sm text-gray-500 mt-1">{reminder.time}</p>
            )}
            {reminder.description && (
              <p className="text-sm text-gray-600 mt-2">{reminder.description}</p>
            )}
          </div>
          <button
            onClick={() => onDelete(reminder.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}