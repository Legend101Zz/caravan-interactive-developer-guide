import styled from "styled-components";
import { motion } from "framer-motion";

export const Card = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: perspective(1000px) rotateX(5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: perspective(1000px) rotateX(0deg);
  }
`;
