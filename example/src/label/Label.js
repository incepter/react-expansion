import React from 'react'

export function ExpansionLabel({ expanded, children, style = {} }) {
  return (
    <span
      style={{
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.25',
        fontFamily: 'Roboto',
        color: '#8092A5',
        opacity: expanded ? 1 : 0.8,
        ...style
      }}
    >
      {children}
    </span>
  );
}
