// components/HabitCalendar.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, Modal, Button, Input, Select, Typography, Tooltip, Space } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LeftOutlined, RightOutlined, UndoOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './HabitCalendar.css';

const { Option } = Select;
const { Title, Text } = Typography;

interface HabitCalendarProps {
  habitName: string;
  initialStreakDates?: string[];
  initialBreakDates?: string[];
}

const relapseReasons = [
  'Felt tired',
  'Too busy',
  'Lost motivation',
  'Unexpected interruption',
  'Other'
];

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habitName }) => {
  const generateInitialStreak = () => {
    const dates: string[] = [];
    for (let i = 10; i >= 1; i--) {
      dates.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
    }
    return dates;
  };

  const initialStreakDates = generateInitialStreak();
  const initialBreakDates = [dayjs().format('YYYY-MM-DD')];

  const [streakDates, setStreakDates] = useState<string[]>([]);
  const [breakDates, setBreakDates] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [relapseReason, setRelapseReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    localStorage.removeItem(`${habitName}-streaks`);
    localStorage.removeItem(`${habitName}-breaks`);

    const storedStreak = localStorage.getItem(`${habitName}-streaks`);
    const storedBreaks = localStorage.getItem(`${habitName}-breaks`);
    if (storedStreak) setStreakDates(JSON.parse(storedStreak));
    else setStreakDates(initialStreakDates);

    if (storedBreaks) setBreakDates(JSON.parse(storedBreaks));
    else {
      const defaultBreaks: Record<string, string> = {};
      initialBreakDates.forEach(d => (defaultBreaks[d] = 'Felt tired'));
      setBreakDates(defaultBreaks);
    }
  }, [habitName,initialBreakDates]);

  useEffect(() => {
    localStorage.setItem(`${habitName}-streaks`, JSON.stringify(streakDates));
    localStorage.setItem(`${habitName}-breaks`, JSON.stringify(breakDates));
  }, [streakDates, breakDates, habitName]);

  const isStreakDay = (date: Dayjs) => streakDates.includes(date.format('YYYY-MM-DD'));
  const isBreakDay = (date: Dayjs) => Object.keys(breakDates).includes(date.format('YYYY-MM-DD'));

  const dateCellRender: CalendarProps<Dayjs>["dateCellRender"] = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const isStreak = isStreakDay(value);
    const isBreak = isBreakDay(value);

    const prev = value.subtract(1, 'day').format('YYYY-MM-DD');
    const next = value.add(1, 'day').format('YYYY-MM-DD');

    const hasPrev = streakDates.includes(prev);
    const hasNext = streakDates.includes(next);

    const className = classNames('streak-day', {
      'start': isStreak && !hasPrev && hasNext,
      'middle': isStreak && hasPrev && hasNext,
      'end': isStreak && hasPrev && !hasNext,
      'solo': isStreak && !hasPrev && !hasNext,
      'break-day': isBreak
    });

    return (
      <Tooltip title={isBreak ? breakDates[dateStr] : undefined}>
        <div
          className={className}
          onClick={() => handleDateClick(value)}
          style={{ cursor: 'pointer' }}
        >
          {isStreak ? '✔' : isBreak ? '✘' : ''}
        </div>
      </Tooltip>
    );
  };

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleRelapseSubmit = () => {
    const reason = relapseReason === 'Other' ? customReason : relapseReason;
    const dateStr = selectedDate?.format('YYYY-MM-DD') || '';

    const updatedStreak = streakDates.filter(d => d !== dateStr);
    const updatedBreaks = { ...breakDates, [dateStr]: reason };

    setStreakDates(updatedStreak);
    setBreakDates(updatedBreaks);
    setModalVisible(false);
    setRelapseReason('');
    setCustomReason('');
  };

  const handleUndoRelapse = () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.format('YYYY-MM-DD');
    const updatedBreaks = { ...breakDates };
    delete updatedBreaks[dateStr];
    setBreakDates(updatedBreaks);
    setStreakDates([...streakDates, dateStr].sort());
    setModalVisible(false);
  };

  const headerRender = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem' }}>
        <Button icon={<LeftOutlined />} onClick={() => setCurrentMonth(prev => prev.subtract(1, 'month'))} />
        <Title level={4} style={{ margin: 0 }}>{currentMonth.format('MMMM YYYY')}</Title>
        <Button icon={<RightOutlined />} onClick={() => setCurrentMonth(prev => prev.add(1, 'month'))} />
      </div>
    );
  };

  const currentStreak = useMemo(() => {
    // const sortedDates = [...streakDates].sort();
    let count = 0;
    let day = dayjs();
    while (streakDates.includes(day.format('YYYY-MM-DD'))) {
      count++;
      day = day.subtract(1, 'day');
    }
    return count;
  }, [streakDates]);

  return (
    <div style={{ padding: '2rem' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={3}>{habitName} Tracker</Title>
        <Text strong>🔥 Current Streak: {currentStreak} day{currentStreak !== 1 ? 's' : ''}</Text>
        <Calendar
          value={currentMonth}
          onPanelChange={(val) => setCurrentMonth(val)}
          dateCellRender={dateCellRender}
          headerRender={headerRender}
        />
      </Space>

      <Modal
        title="Relapse Reason"
        open={modalVisible}
        onOk={handleRelapseSubmit}
        onCancel={() => setModalVisible(false)}
        okText="Submit"
        footer={[
          <Button key="undo" icon={<UndoOutlined />} onClick={handleUndoRelapse} disabled={!selectedDate || !isBreakDay(selectedDate!)}>
            Undo Relapse
          </Button>,
          <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleRelapseSubmit}>Submit</Button>
        ]}
      >
        <p>Why did you break your streak?</p>
        <Select
          style={{ width: '100%', marginBottom: '1rem' }}
          onChange={value => setRelapseReason(value)}
          value={relapseReason}
        >
          {relapseReasons.map(reason => (
            <Option key={reason} value={reason}>{reason}</Option>
          ))}
        </Select>
        {relapseReason === 'Other' && (
          <Input.TextArea
            rows={3}
            placeholder="Describe what happened..."
            value={customReason}
            onChange={e => setCustomReason(e.target.value)}
          />
        )}
      </Modal>
    </div>
  );
};

export default HabitCalendar;
