import React, { Component } from 'react'
import ExpandCollapse from 'react-expansion'

function BaseIndicator({ content, toggleExpansion }) {
  return (
    <button
      style={{
        color: 'grey',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: '1px solid grey',
        borderRadius: '50%'
      }}
      onClick={toggleExpansion}
    >
      {content}
    </button>
  )
} function DefaultIndicator({
  position,
  expanded,
  toggleExpansion
}) {
  if (position === 'start') {
    return (
      <BaseIndicator
        content={expanded ? '\\/' : '>'}
        toggleExpansion={toggleExpansion}
      />
    )
  }
  if (position === 'end') {
    return (
      <BaseIndicator
        content={expanded ? '\\/' : '/\\'}
        toggleExpansion={toggleExpansion}
      />
    )
  }
  return null
}

const Divider = () => <hr />
const ExpansionComponent = ({ expanded, children }) => {
  const styles = expanded ? { borderBottom: '1px solid #eee' } : {}
  styles.display = 'flex'
  styles.padding = 24
  return <div style={styles}>{children}</div>
}

function NormalExpandCollapse(props) {
  return (
    <ExpandCollapse
      Component='div'
      ComponentProps={{
        style: {
          border: '1px solid #eee',
          borderRadius: 4,
          maxWidth: '60%',
          margin: 'auto',
          marginTop: 24
        }
      }}
      ExpansionComponent={ExpansionComponent}
      IndicatorComponent={DefaultIndicator}
      DividerComponent={Divider}
      contentContainerProps={{
        style: {
          padding: 24
        }
      }}
      label='Normal expand collapse'
      {...props}
    >
      <MyComponent />
    </ExpandCollapse>
  )
}
export default function App() {
  return (
    <>
      <NormalExpandCollapse />
      <NormalExpandCollapse DividerComponent={() => null} indicatorPosition='start' labelPosition='end' keepMounted label='Keep Mounted' />
    </>
  )
}

function MyComponent() {
  console.log('rendered my component')
  return (
    <div>
      <h1>Modern React component module</h1>
    </div>
  )
}
