import React from "react";
import styled from "styled-components";

const ConsoleContainer = styled.div`
  background-color: #2d2d2d;
  border: 1px solid #3f3f3f;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.medium};
  font-family: ${(props) => props.theme.fonts.body};
  white-space: pre-wrap;
  word-break: break-all;
`;

const Console: React.FC<{ output: string }> = ({ output }) => (
  <ConsoleContainer>
    <span style={{ color: "#569cd6" }}>{"> "}</span>
    {output}
  </ConsoleContainer>
);

export default Console;
