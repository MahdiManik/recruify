import { create } from "zustand";

const useInterviewStore = create((set) => ({
  interviews: JSON.parse(localStorage.getItem("interviews")) || [],
  addInterview: (newInterview) =>
    set((state) => {
      const updatedInterviews = [...state.interviews, newInterview];
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    }),
  updateInterview: (id, updatedInterview) =>
    set((state) => {
      const updatedInterviews = state.interviews.map((interview) =>
        interview.id === id ? updatedInterview : interview
      );
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    }),
  deleteInterview: (id) =>
    set((state) => {
      const updatedInterviews = state.interviews.filter((i) => i.id !== id);
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    }),
}));

export default useInterviewStore;
