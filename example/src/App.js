import React from 'react'
import ExpandCollapse from 'react-expansion'
import { ExpansionDivider } from './divider/Divider'
import { ExpansionLabel } from './label/Label'
import FileSystemExpandCollapseDemo from './demos/filesystem/FileSystem'
import PaperExpandCollapse from './demos/paper'
import InlineExpandCollapse from './demos/inline'
import AccordionDemo from './demos/accordion'

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
          width: '50%',
          border: '1px solid #eee',
          borderRadius: 4,
          maxWidth: '60%',
          margin: 'auto',
          marginTop: 8
        }
      }}
      LabelComponent={ExpansionLabel}
      ExpansionComponent={ExpansionComponent}
      IndicatorComponent={DefaultIndicator}
      DividerComponent={ExpansionDivider}
      contentContainerProps={{
        style: {
          padding: 8
        }
      }}
      label='expand/collapse'
      {...props}
    >
      {props.children || <MyComponent/>}
    </ExpandCollapse>
  )
}
function Wrapper({children}) {
  return <div style={{ width: '50%', margin: 'auto'}}>{children}</div>
}

export default function App() {
  return (
    <>
      <Wrapper>
        <AccordionDemo/>
      </Wrapper>
      <FileSystemExpandCollapseDemo/>
      <Wrapper>
        <InlineExpandCollapse/>
        <InlineExpandCollapse/>
        <InlineExpandCollapse/>
      </Wrapper>
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
        label='Label End'
      >
        <NormalExpandCollapse
          keepMounted
          label='Cool divider'
        >
          <NormalExpandCollapse
            keepMounted
            label='Indicator End'
            indicatorPosition="end"
          >
            React
          </NormalExpandCollapse>
          <NormalExpandCollapse
            keepMounted
            label='Keep Mounted'
          >
            Expansion
          </NormalExpandCollapse>
          is awesome!
        </NormalExpandCollapse>
      </NormalExpandCollapse>
    </>
  )
}

function MyComponent() {
  return (
    <span>Expand collapse children</span>
  )
}
