import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Shared/Button";
import { toast } from "react-hot-toast";
import useInterviewStore from "../store/useScheduleStore";
import TimeSlotSelected from "./TimeSlot";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ dark }) => (dark ? "#1a202c" : "#f4f4f4")};
  padding: 80px 10px;
`;
const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export default function ScheduleInterview() {
  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const { addInterview, validateConflict } = useInterviewStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !candidate ||
      !interviewer ||
      !selectedDate ||
      !timeSlot ||
      !interviewType
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (validateConflict(interviewer, candidate, selectedDate, timeSlot)) {
      toast.error("Conflict detected! Please choose a different time slot.");
      return;
    }

    addInterview({
      candidate,
      interviewer,
      selectedDate,
      timeSlot,
      interviewType,
    });
    toast.success("Interview scheduled successfully!");

    setCandidate("");
    setInterviewer("");
    setSelectedDate("");
    setTimeSlot("");
    setInterviewType("");
  };

  return (
    <Section>
      <Container>
        <Title>Schedule an Interview</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Candidate Name</Label>
          <Select
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
          >
            <option value="">Select Candidate</option>
            <option value="Alice Brown">Alice Brown</option>
            <option value="Chris Green">Chris Green</option>
            <option value="Emily White">Emily White</option>
          </Select>

          <Label>Interviewer Name</Label>
          <Select
            value={interviewer}
            onChange={(e) => setInterviewer(e.target.value)}
          >
            <option value="">Select Interviewer</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Robert Johnson">Robert Johnson</option>
          </Select>

          <Label>Date</Label>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(new Date(date))}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              filterDate={(date) => date >= new Date()} // This will filter out past dates
            />
          </DatePickerWrapper>

          <TimeSlotSelected
            selectedDate={selectedDate}
            interviewer={interviewer}
            candidate={candidate}
            selectedTimeSlot={timeSlot}
            onTimeSlotSelect={setTimeSlot}
          />

          <Label>Interview Type</Label>
          <Select
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
          >
            <option value="">Select Interview Type</option>
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
          </Select>

          <Button type="submit">Schedule Interview</Button>
        </Form>
      </Container>
    </Section>
  );
}
