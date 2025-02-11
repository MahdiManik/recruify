// import useInterviewStore from "../store/interviewStore";
// import { Link } from "react-router-dom";

// export default function Home() {
//   const { interviews, deleteInterview } = useInterviewStore();

//   return (
//     <div>
//       <h2>Scheduled Interviews</h2>
//       {interviews.length === 0 ? <p>No interviews scheduled.</p> : null}
//       <ul>
//         {interviews.map((interview) => (
//           <li key={interview.id}>
//             {interview.candidate} with {interview.interviewer} on {interview.date} at {interview.time} ({interview.type})
//             <button onClick={() => deleteInterview(interview.id)}>Delete</button>
//             <Link to={`/edit/${interview.id}`}>Edit</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// Install styled-components if you haven't: npm install styled-components

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Arial", sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(to bottom, #f953c6, #b91d73);
  color: white;
  padding: 100px 20px;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  img {
    max-width: 80%;
    border-radius: 10px;
  }
`;

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>Clean & Modern UI with React</Title>
          <Subtitle>
            Intuitive platform for interviews. Schedule and manage interviews
            easily.
          </Subtitle>
        </HeroContent>
        <ImageContainer>
          <img src="https://via.placeholder.com/800x400" alt="Hero Design" />
        </ImageContainer>
      </HeroSection>
    </Container>
  );
};

export default Home;
