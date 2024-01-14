import React, { PropsWithChildren } from 'react';

type TextProps = {
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  fontType?: 'heading' | 'body';
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger';
};

export const Text = ({ tag = 'p', fontSize = 'md', fontType = 'body', variant, children }:PropsWithChildren<TextProps>) => {
  const className = `text-${fontSize} ${fontType === 'heading' ? 'font-heading' : 'font-body'} ${variant ? `text-${variant}` : 'text-text'}`;

  switch (tag) {
    case 'h1':
      return <h1 className={className}>{children}</h1>;
    case 'h2':
      return <h2 className={className}>{children}</h2>;
    case 'h3':
      return <h3 className={className}>{children}</h3>;
    case 'h4':
      return <h4 className={className}>{children}</h4>;
    case 'h5':
      return <h5 className={className}>{children}</h5>;
    case 'h6':
      return <h6 className={className}>{children}</h6>;
    default:
      return <p className={className}>{children}</p>;
  }
};
