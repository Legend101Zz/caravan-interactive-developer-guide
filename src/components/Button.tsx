import styled from "styled-components";
import { motion } from "framer-motion";

export const Button = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.small};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 14px;
    padding: 10px 16px;
  }
`;
