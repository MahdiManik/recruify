// components/Dashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCalendarAlt, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import useInterviewStore from "../store/useScheduleStore";
import Button from "../components/Shared/Button";

// Styled Components
const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  width: 98%;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const InterviewGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InterviewCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CandidateName = styled.h3`
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const InterviewerInfo = styled.p`
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const DateInfo = styled.p`
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TypeBadge = styled.span`
  display: inline-block;
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &.edit {
    color: #3b82f6;
    &:hover {
      background-color: #eff6ff;
    }
  }

  &.delete {
    color: #ef4444;
    &:hover {
      background-color: #fef2f2;
    }
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #6b7280;
  padding: 2rem 0;
`;

function Dashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    date: "",
    interviewer: "",
    candidate: "",
  });

  const { deleteInterview, getFilteredInterviews } = useInterviewStore();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      deleteInterview(id);
    }
  };

  const filteredInterviews = getFilteredInterviews(filter);

  return (
    <Container>
      <Header>
        <Title>Interview Dashboard</Title>
        <Button onClick={() => navigate("/schedule")}>
          <FaPlus size={14} />
          Schedule New Interview
        </Button>
      </Header>

      <FilterContainer>
        <FilterInput
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        <FilterInput
          type="text"
          placeholder="Filter by interviewer..."
          value={filter?.interviewer}
          onChange={(e) =>
            setFilter({ ...filter, interviewer: e.target.value })
          }
        />
        <FilterInput
          type="text"
          placeholder="Filter by candidate..."
          value={filter?.candidate}
          onChange={(e) =>
            setFilter({ ...filter, candidate: e.target.value })
          }
        />
      </FilterContainer>
      <InterviewGrid>
        {filteredInterviews.map((interview) => (
          <InterviewCard key={interview.id}>
            <CardContent>
              <CardInfo>
                <CandidateName>{interview.candidateName}</CandidateName>
                <InterviewerInfo>
                  Interviewer: {interview.interviewerName}
                </InterviewerInfo>
                <DateInfo>
                  <FaCalendarAlt size={14} />
                  {new Date(`${interview.date}T${interview.timeSlot}`).toLocaleString()} 
                </DateInfo>
                <TypeBadge>{interview.type}</TypeBadge>
              </CardInfo>
              <ButtonGroup>
                <IconButton
                  className="edit"
                  onClick={() => navigate(`/edit/${interview.id}`)}
                >
                  <FaEdit size={16} />
                </IconButton>
                <IconButton
                  className="delete"
                  onClick={() => handleDelete(interview.id)}
                >
                  <FaTrashAlt size={16} />
                </IconButton>
              </ButtonGroup>
            </CardContent>
          </InterviewCard>
        ))}
        {filteredInterviews.length === 0 && (
          <EmptyMessage>No interviews found</EmptyMessage>
        )}
      </InterviewGrid>
    </Container>
  );
}

export default Dashboard;
