'use client';
//TODO: Make this card a generic one , so that we can use it for other purposes as well
import { useState } from 'react';
import { Card, Modal } from 'antd';
import HabitCalendar from './HabitCalendar';

export default function MyCard() {
  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <>
      <Card
        hoverable
        cover={<img alt="Tracker UI" src="/habit_tracker.png" />}
        onClick={() => setCalendarVisible(true)}
        style={{ cursor: 'pointer' }}
      >
        Daily Habit Tracker
      </Card>

      <Modal
        open={calendarVisible}
        footer={null}
        onCancel={() => setCalendarVisible(false)}
        width={900}
      >
            <HabitCalendar
      habitName="Read on Kindle"
      initialStreakDates={['2025-05-23', '2025-05-24', '2025-05-25']}
      initialBreakDates={['2025-05-26']}
    />

      </Modal>
    </>
  );
}
