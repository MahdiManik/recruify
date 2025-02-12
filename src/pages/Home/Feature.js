import React from "react";
import styled from "styled-components";
import { FaGlobe, FaCalendarAlt, FaPhone, FaFolderOpen } from "react-icons/fa";

const Container = styled.div`
  background-color: #2a2a2e;
  color: white;
  padding: 50px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.p`
  font-size: 18px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 40px;
    margin-bottom: 15px;
    color: #4caf50;
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  color: #cccccc;
`;

const ActionLink = styled.a`
  font-size: 16px;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Feature() {
  return (
    <Container>
      <Title>Interview Management</Title>
      <SubTitle>Schedule and manage interviews with ease</SubTitle>
      <CardGrid>
        <Card>
          <FaGlobe />
          <CardTitle>Schedule Interviews</CardTitle>
          <CardDescription>Efficient and user-friendly interview scheduling</CardDescription>
          <ActionLink href="/schedule">Book Now</ActionLink>
        </Card>
        <Card>
          <FaCalendarAlt />
          <CardTitle>Interview Scheduler</CardTitle>
          <CardDescription>Simplify the interview scheduling process</CardDescription>
          <ActionLink href="/schedule">Schedule Now</ActionLink>
        </Card>
        <Card>
          <FaPhone />
          <CardTitle>Scheduling Platform</CardTitle>
          <CardDescription>Modern platform for interview scheduling</CardDescription>
          <ActionLink href="/schedule">Start Scheduling</ActionLink>
        </Card>
        <Card>
          <FaFolderOpen />
          <CardTitle>Interview Manager</CardTitle>
          <CardDescription>Manage interviews seamlessly</CardDescription>
          <ActionLink href="/dashboard">Manage Now</ActionLink>
        </Card>
      </CardGrid>
    </Container>
  );
}
