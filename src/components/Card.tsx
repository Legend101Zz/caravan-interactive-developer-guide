import React from "react";
import styled from "styled-components";

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const CardWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.medium};
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
