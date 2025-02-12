import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useInterviewStore from "../store/useScheduleStore";

const TimeSlotPickerContainer = styled.div`
  margin-bottom: 20px;
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  width: 100%;
`;

const TimeSlot = styled.button`
  background-color: ${(props) => (props.selected ? "#4CAF50" : props.disabled ? "#ccc" : "#f0f0f0")};
  color: ${(props) => (props.disabled ? "#666" : "#333")};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#e0e0e0")};
  }
`;

export default function TimeSlotSelected({ selectedDate, interviewer, candidate, onTimeSlotSelect, selectedTimeSlot }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const { checkConflicts } = useInterviewStore();

  const allTimeSlots = useMemo(() => {
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i >= 12 ? "PM" : "AM";
      slots.push({ id: i, time: `${hour}:00 ${period}` });
    }
    return slots;
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    const slots = allTimeSlots.map((slot) => {
      const newInterview = {
        date: selectedDate,
        timeSlot: slot.time,
        interviewerName: interviewer,
        candidateName: candidate,
      };

      return {
        ...slot,
        disabled: checkConflicts(newInterview),
      };
    });

    setAvailableSlots(slots);
  }, [selectedDate, interviewer, candidate, checkConflicts, allTimeSlots]);

  return (
    <TimeSlotPickerContainer>
      <h3>Select a Time Slot</h3>
      <SlotsGrid>
        {availableSlots.map((slot) => (
          <TimeSlot
            key={slot.id}
            disabled={slot.disabled}
            selected={selectedTimeSlot === slot.time}
            onClick={() => !slot.disabled && onTimeSlotSelect(slot.time)}
          >
            {slot.time}
          </TimeSlot>
        ))}
        {availableSlots.length === 0 && <p>No available slots for this date.</p>}
      </SlotsGrid>
    </TimeSlotPickerContainer>
  );
}
