import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  margin-bottom: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 14px;
    padding: 10px;
  }
`;
