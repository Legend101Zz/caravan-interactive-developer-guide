declare module "prism-react-renderer" {
  import * as React from "react";

  type Language = string;
  type StyleObj = { [key: string]: string | number };

  interface HighlightProps {
    theme: any;
    language: Language;
    code: string;
    children: (props: RenderProps) => React.ReactNode;
  }

  interface RenderProps {
    className: string;
    style: StyleObj;
    tokens: Token[][];
    getLineProps: (lineProps: LineInputProps) => LineOutputProps;
    getTokenProps: (tokenProps: TokenInputProps) => TokenOutputProps;
  }

  interface Token {
    types: string[];
    content: string;
    empty?: boolean;
  }

  interface LineInputProps {
    key?: React.Key;
    style?: StyleObj;
    className?: string;
    line: Token[];
  }

  interface LineOutputProps {
    className: string;
    style?: StyleObj;
  }

  interface TokenInputProps {
    key?: React.Key;
    style?: StyleObj;
    className?: string;
    token: Token;
  }

  interface TokenOutputProps {
    className: string;
    style?: StyleObj;
    children: string;
  }

  export const Highlight: React.FC<HighlightProps>;
  export const themes: { [key: string]: any };
}
