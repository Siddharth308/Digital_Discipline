// app/page.tsx
'use client';

import { Button, Typography, Row, Col, Card } from 'antd';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import 'antd/dist/reset.css';


const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <main style={{ background: '#eef2f6', padding: '3rem 2rem' }}>
      {/* Hero Section */}
      <Row justify="center" align="middle" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <Col span={18}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title style={{ fontSize: '3rem' }}>Take Control of Your Digital Life</Title>
            <Paragraph style={{ fontSize: '1.2rem', color: '#666' }}>
              A simple guide-based tool to help you set digital boundaries, reduce screen time, and build focus — without installing blockers.
            </Paragraph>
            <Button type="primary" size="large" style={{ marginTop: '1.5rem' }}>
              Get Started
            </Button>
          </motion.div>
        </Col>
      </Row>

      {/* Why It Matters Section */}
      <Row justify="center" style={{ marginTop: '4rem' }} gutter={32}>
        <Col span={18}>
          <Title level={3}>Is this you?</Title>
          <Paragraph>- You check Instagram every few minutes without thinking.</Paragraph>
          <Paragraph>- You’ve set Screen Time limits… and ignored them.</Paragraph>
          <Paragraph>- You feel guilt after binge-watching reels or visiting sites you wish you hadn't.</Paragraph>
        </Col>
      </Row>

      {/* How It Works */}
      <Row justify="center" gutter={[32, 32]} style={{ marginTop: '4rem' }}>
        <Col xs={24} md={8}>
          <Card hoverable>
            <Title level={4}>1. Choose Your Device</Title>
            <Paragraph>Select iPhone, Android, Mac, Windows, or Chrome.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable>
            <Title level={4}>2. Follow the Setup Guide</Title>
            <Paragraph>We walk you through how to restrict or block distractions using built-in tools.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable>
            <Title level={4}>3. Track Your Progress</Title>
            <Paragraph>Use our simple tracker to log focus days and monitor your growth.</Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Preview / Demo Section */}
      <Row justify="center" gutter={[32, 32]} style={{ marginTop: '4rem' }}>
        <Col xs={24} md={8}>
          <Card cover={<img alt="iPhone Guide" src="/iphone_guide.png" />}>iPhone Screen Time Guide</Card>
        </Col>
        <Col xs={24} md={8}>
          <Card cover={<img alt="Tracker UI" src="/habit_tracker.png" />}>Daily Habit Tracker</Card>
        </Col>
        <Col xs={24} md={8}>
          <Card cover={<img alt="Reflection Prompt" src="/reflection_prompt.png" />}>Reflection Journal Prompt</Card>
        </Col>
      </Row>

      {/* CTA Footer */}
      <Row justify="center" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <Col span={18}>
          <Title level={3}>Ready to reclaim your focus?</Title>
          <Button type="primary" size="large">Start Now</Button>
        </Col>
      </Row>
    </main>
  );
}
