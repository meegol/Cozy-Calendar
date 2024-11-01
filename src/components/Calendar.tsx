import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import type { Reminder } from '../types/reminder';

interface CalendarProps {
  selectedDate: Date;
  reminders: Reminder[];
  onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, reminders, onDateSelect }: CalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {format(selectedDate, 'MMMM yyyy')}
      </h2>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayReminders = reminders.filter((reminder) =>
            isSameDay(new Date(reminder.date), day)
          );
          
          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`
                aspect-square p-2 rounded-lg relative
                hover:bg-orange-50 transition-colors
                ${isSameDay(day, selectedDate) ? 'bg-orange-100 font-semibold' : 'bg-gray-50'}
              `}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {dayReminders.length > 0 && (
                <div className="absolute bottom-1 right-1 left-1 flex gap-1 justify-center">
                  {dayReminders.slice(0, 3).map((reminder) => (
                    <div
                      key={reminder.id}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: reminder.color }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}