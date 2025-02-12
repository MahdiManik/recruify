import styled from "styled-components";
import Button from "../../components/Shared/Button";
import hr from "../../assets/hr.jpg.webp";

const HeroSection = styled.section`
 @media (min-width: 768px) {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 80px 5%;
 background: linear-gradient(rgba(20, 76, 197, 0.3), rgba(196, 28, 196, 0.57)),
  min-height: 50vh;
}
  margin: 20px auto;
  display: flex;
  flex-direction: column-reverse;
   align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
`;

const Content = styled.div`
 @media (min-width: 768px) {
  flex: 1;
  max-width: 600px;
} 
`;

const Title = styled.h1`
 @media (min-width: 768px) {
   font-size: 36px;
  color: #113c3c;
  font-weight: 600;
  margin-bottom: 12px;}
  font-size: 24px;
`;

const Subtitle = styled.p`
 @media (min-width: 768px) {
  font-size: 18px;
  color: #4a4a4a;
  margin-bottom: 20px;
}
  font-size: 14px;
  margin-bottom: 25px;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 400px;
  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Hero = () => {
  return (
    <>
      <HeroSection>
        <Content>
          <Title>Schedule and manage interviews</Title>
          <Subtitle>
            An intuitive platform to schedule and manage interviews with a clean and modern user interface.
          </Subtitle>
          <Button>Schedule</Button>
        </Content>
        <ImageContainer>
          <img src={hr} alt="Professional Woman" />
        </ImageContainer>
      </HeroSection>
    </>
  );
};

export default Hero;
