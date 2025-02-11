import { useParams, useNavigate } from "react-router-dom";
import useInterviewStore from "../store/interviewStore";
import { useState } from "react";

export default function EditInterview() {
  const { id } = useParams();
  const { interviews, updateInterview } = useInterviewStore();
  const navigate = useNavigate();

  const interview = interviews.find((i) => i.id === id);
  const [formData, setFormData] = useState(interview);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInterview(id, formData);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Interview</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="candidate" value={formData.candidate} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
