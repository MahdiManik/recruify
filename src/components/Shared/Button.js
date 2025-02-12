import styled from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  outline: none;
  border: 2px solid #4caf50;
  background: linear-gradient(to right, #4caf50, #45a049);
  transition: box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #4caf50, #9edb95);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-color: #3d8e3a;
  }

  &:active {
    background: linear-gradient(to right, #45a049, #3d8e3a);
    border-color: #3d8e3a;
    transform: scale(0.9);
  }
`;

const Button = ({ children, onClick }) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
