export interface Reminder {
  id: string;
  title: string;
  date: string;
  time?: string;
  description?: string;
  completed: boolean;
  color: string;
}