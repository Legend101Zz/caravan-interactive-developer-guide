import React from "react";
import styled from "styled-components";
import { Highlight, themes } from "prism-react-renderer";

const Pre = styled.pre`
  text-align: left;
  margin: 0;
  padding: 1em;
  overflow: auto;
  border-radius: 8px;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

interface CodeBlockProps {
  children: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => (
  <Highlight
    theme={themes.vsDark}
    code={children.trim()}
    language={language as any}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <Line key={i} {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContent>
          </Line>
        ))}
      </Pre>
    )}
  </Highlight>
);

export default CodeBlock;
