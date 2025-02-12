import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Shared/Button";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useInterviewStore from "../store/useScheduleStore";
import CalendarView from "./CalenderView";
import timeZones from "../data/TimeZones";
import { fromZonedTime } from 'date-fns-tz';

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ dark }) => (dark ? "#1a202c" : "#f4f4f4")};
  
`;
const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
  .react-datepicker-wrapper {
    width: 99%;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 40px auto;
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
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  margin: 40px auto;
`;
const Border = styled.div`
  border-bottom: 1px solid green;
  border-radius: 12px;
  width: 24%;
  margin: 0px auto;
`;

export default function ScheduleInterview() {
  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const { addInterview, checkConflicts, interviews } = useInterviewStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');

  useEffect(() => {
    // Function to get available time slots
    const getAvailableTimeSlots = () => {
      const timeSlots = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
      ]; // Define your time slots here
      const unavailableSlots = interviews
        .filter(interview => interview.date === selectedDate.toISOString().split('T')[0] && 
          (interview.interviewerName === interviewer || interview.candidateName === candidate))
        .map(interview => interview.timeSlot);

      const availableSlots = timeSlots.filter(slot => !unavailableSlots.includes(slot));
      setAvailableTimeSlots(availableSlots);
    };

    getAvailableTimeSlots();
  }, [selectedDate, interviewer, candidate, interviews]);

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
    const interviewDateTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${timeSlot}`);
    const utcDateTime = fromZonedTime(interviewDateTime, selectedTimeZone);
    console.log(utcDateTime);

    if (checkConflicts(interviewer, candidate, utcDateTime, timeSlot)) {
      toast.error("Conflict detected! Please choose a different time slot.");
      return;
    }

    addInterview({
      candidate,
      interviewer,
      date: selectedDate.toISOString().split('T')[0], 
      timeSlot,
      interviewType,
      timeZone: selectedTimeZone,
    });
    toast.success("Interview scheduled successfully!");

    setCandidate("");
    setInterviewer("");
    setSelectedDate(new Date());
    setTimeSlot("");
    setInterviewType("");
    setSelectedTimeZone('UTC');
  };


  return (
    <Section>
      <Container>
        <Title>Display available time slots</Title>
        <Border />
        <CalendarView />
        <Title>Schedule an Interview</Title>
        <Border />
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

          <Label>Time Zone</Label>
          <Select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
          >
            {timeZones.map(zone => (
              <option key={zone.value} value={zone.value}>{zone.label}</option>
            ))}
          </Select>

          <Label>Available Time Slots</Label>
          <Select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select Time Slot</option>
            {availableTimeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </Select>

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
