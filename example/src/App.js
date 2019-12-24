import React from 'react'
import ExpandCollapse from 'react-expansion'
import { ExpansionDivider } from './divider/Divider'
import { ExpansionLabel } from './label/Label'
import FileSystemExpandCollapseDemo from './demos/filesystem/FileSystem'

function BaseIndicator({content, toggleExpansion, style = {}}) {
  return (
    <button
      style={{
        width: 24,
        height: 24,
        color: 'grey',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: '1px solid grey',
        borderRadius: '50%',
        ...style
      }}
      onClick={toggleExpansion}
    >
      {content}
    </button>
  )
}

function DefaultIndicator({expanded, toggleExpansion, style}) {
  return (
    <BaseIndicator
      content={expanded ? '-' : '+'}
      toggleExpansion={toggleExpansion}
      style={style}
    />
  )
}

const Divider = () => <hr/>
const ExpansionComponent = ({expanded, toggleExpansion, children, style = {}, clickable}) => {
  const styles = {...style}
  if (expanded) {
    styles.borderBottom = '1px solid #eee'
  }
  styles.display = 'flex'
  styles.alignItems = 'center'
  styles.padding = 16
  return <div onClick={clickable && toggleExpansion} style={styles}>{children}</div>
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
      LabelComponent={ExpansionLabel}
      ExpansionComponent={ExpansionComponent}
      IndicatorComponent={DefaultIndicator}
      DividerComponent={ExpansionDivider}
      contentContainerProps={{
        style: {
          padding: 24
        }
      }}
      label='expand/collapse'
      {...props}
    >
      {props.children || <MyComponent/>}
    </ExpandCollapse>
  )
}

export default function App() {
  return (
    <>
      <FileSystemExpandCollapseDemo />
      <NormalExpandCollapse
        indicatorPosition='start'
        labelPosition='end'
        label='Keep Mounted'
        DividerComponent={() => null}
      />
      <NormalExpandCollapse
        indicatorPosition='start'
        labelPosition='end'
        keepMounted
        label='Keep Mounted'
      >
        <NormalExpandCollapse
          keepMounted
          label='Keep Mounted'
        >
          <NormalExpandCollapse
            keepMounted
            label='Keep Mounted'
          >
            Hahaha
          </NormalExpandCollapse>
          <NormalExpandCollapse
            keepMounted
            label='Keep Mounted'
          >
            Hahaha
          </NormalExpandCollapse>
          LOL:!
        </NormalExpandCollapse>
      </NormalExpandCollapse>
      <NormalExpandCollapse
        label="click to toggle expansion state"
        IndicatorComponent={null}
        DividerComponent={null}
        ExpansionProps={{
          style: {
            borderRadius: 4,
            cursor: 'pointer'
          },
          clickable: true
        }}
      />
    </>
  )
}

function MyComponent() {
  return (
    <span>Modern React component module</span>
  )
}
