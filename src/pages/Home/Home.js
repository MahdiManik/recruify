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
import heroBg from "../../assets/bg1.jpg";
import bg1 from "../../assets/hero-bg.jpg";
import Button from "../../components/Shared/Button";
import Hero from "./Hero";
import Feature from "./Feature";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-family: "Arial", sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5)),
    url(${heroBg});
  background-size: cover;
  background-position: center;
  height: 63vh;
  color: blck;
  padding: 100px 20px;
  text-align: center;
`;

const HeroContent = styled.div`
  margin-top: 100px;
  padding: 40px;
  border-radius: 10px;
  background: white;
  @media (min-width: 768px) {
    padding-buttom: 20px;
    padding: 40px;
    border-radius: 10px;
    background: white;
    max-width: 600px;
    height: 40%;
    margin: 0 auto;
    margin-top: -70px;
    position: relative;
    z-index: 10;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 48px;
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  font-size: 13px;
  line-height: 1;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 1.6;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 200px;
  buttom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin-top: 40px;

  img {
    display: none;
    @media (min-width: 768px) {
      max-width: 45%;
      border-radius: 10px;
      display: block;
    }
  }
`;

const Home = () => {
  return (
    <>
      <Container>
        <HeroSection>
          <HeroContent>
            <Title>Clean & Modern</Title>
            <Subtitle>
              Intuitive platform for interviews. Schedule and manage interviews
              easily.
            </Subtitle>
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </HeroContent>
          <ImageContainer>
            <img src={bg1} alt="Hero Design" />
          </ImageContainer>
        </HeroSection>
      </Container>
      <Hero />
      <Feature />
    </>
  );
};

export default Home;
