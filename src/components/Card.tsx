import React from "react";
import styled from "styled-components";

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const CardWrapper = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.large};
  overflow: hidden;
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  font-size: 1.2rem;
`;

const CardContent = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <CardWrapper>
    {title && <CardTitle>{title}</CardTitle>}
    <CardContent>{children}</CardContent>
  </CardWrapper>
);
