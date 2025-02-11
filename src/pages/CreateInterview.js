import { useState } from "react";
import useInterviewStore from "../store/interviewStore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const availableTimeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

export default function CreateInterview() {
  const { interviews, addInterview } = useInterviewStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: uuidv4(),
    candidate: "",
    interviewer: "",
    date: "",
    time: "",
    type: "Technical",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isConflict = (newInterview) => {
    return interviews.some(
      (i) =>
        i.date === newInterview.date &&
        i.time === newInterview.time &&
        (i.candidate === newInterview.candidate ||
          i.interviewer === newInterview.interviewer)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isConflict(formData)) {
      alert("Conflict! Interviewer or candidate is already booked at this time.");
      return;
    }
    addInterview(formData);
    navigate("/");
  };

  return (
    <div>
      <h2>Schedule an Interview</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="candidate" placeholder="Candidate Name" onChange={handleChange} required />
        <input type="text" name="interviewer" placeholder="Interviewer Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <select name="time" onChange={handleChange} required>
          <option value="">Select Time</option>
          {availableTimeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <select name="type" onChange={handleChange}>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
        </select>
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}
