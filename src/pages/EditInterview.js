import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Shared/Button";
import { Border, Container, DatePickerWrapper, Form, Label, Section, Select, Title } from "../components/ScheduleInterview";
import timeZones from "../data/TimeZones";
import useInterviewStore from "../store/useScheduleStore";
import { toast } from "react-hot-toast";
import { fromZonedTime } from "date-fns-tz";

export default function EditInterview() {
  const { updateInterview, interviews, checkConflicts } = useInterviewStore();
  const { id } = useParams();
  const interview = interviews.find((i) => i.id === id);
  
  const [candidate, setCandidate] = useState(interview?.candidate || "");
  const [interviewer, setInterviewer] = useState(interview?.interviewer || "");
  const [timeSlot, setTimeSlot] = useState(interview?.timeSlot || "");
  const [interviewType, setInterviewType] = useState(interview?.interviewType || "");
  const [selectedDate, setSelectedDate] = useState(interview?.date ? new Date(interview.date) : new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState(interview?.timeZone || "UTC");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getAvailableTimeSlots = () => {
      const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
      const unavailableSlots = interviews
        .filter(
          (interview) =>
            interview.date === selectedDate.toISOString().split("T")[0] &&
            interview.id !== id &&
            (interview.interviewer === interviewer || interview.candidate === candidate)
        )
        .map((interview) => interview.timeSlot);

      const availableSlots = timeSlots.filter((slot) => !unavailableSlots.includes(slot));
      setAvailableTimeSlots(availableSlots);
    };

    getAvailableTimeSlots();
  }, [selectedDate, interviewer, candidate, interviews, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!candidate || !interviewer || !selectedDate || !timeSlot || !interviewType) {
      toast.error("Please fill all fields.");
      return;
    }

    const interviewDateTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${timeSlot}`);
    const utcDateTime = fromZonedTime(interviewDateTime, selectedTimeZone);

    if (checkConflicts(interviewer, candidate, utcDateTime, timeSlot)) {
      toast.error("Conflict detected! Please choose a different time slot.");
      return;
    }

    updateInterview(id, {
      candidate,
      interviewer,
      date: selectedDate.toISOString().split("T")[0],
      timeSlot,
      interviewType,
      timeZone: selectedTimeZone,
    });

    toast.success("Interview updated successfully!");
    navigate("/dashboard");
  };

  return (
    <Section>
      <Container>
        <Title>Edit Scheduled Interview</Title>
        <Border />
        <Form onSubmit={handleSubmit}>
          <Label>Candidate Name</Label>
          <Select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
            <option value="Alice Brown">Alice Brown</option>
            <option value="Chris Green">Chris Green</option>
            <option value="Emily White">Emily White</option>
          </Select>

          <Label>Interviewer Name</Label>
          <Select value={interviewer} onChange={(e) => setInterviewer(e.target.value)}>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Robert Johnson">Robert Johnson</option>
          </Select>

          <Label>Date</Label>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
            />
          </DatePickerWrapper>

          <Label>Time Zone</Label>
          <Select value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)}>
            {timeZones.map((zone) => (
              <option key={zone.value} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </Select>

          <Label>Available Time Slots</Label>
          <Select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
            <option value="">Select Time Slot</option>
            {availableTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>

          <Label>Interview Type</Label>
          <Select value={interviewType} onChange={(e) => setInterviewType(e.target.value)}>
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
          </Select>

          <Button type="submit">Save Changes</Button>
        </Form>
      </Container>
    </Section>
  );
}
