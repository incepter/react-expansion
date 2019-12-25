import React from 'react'
import PaperExpandCollapse from '../paper'
import FileSystemIndicator from '../filesystem/Indicator'

function Nothing() {
  return null;
}
export default function AccordionDemo() {
  const [expandedKey, setExpandedKey] = React.useState(1);
  const onChange = key => newValue => {
    if (expandedKey === key && !newValue) {
      setExpandedKey(undefined)
      return
    }
    setExpandedKey(key)
  }
  return (
    <PaperExpandCollapse
      IndicatorComponent={FileSystemIndicator}
      label={`Accordion - ${expandedKey}`}
      LabelComponent={({children}) => children}
      DividerProps={{
        variant: 'solid'
      }}
      ActionsComponent={Nothing}
    >
      <PaperExpandCollapse onExpandChange={onChange(1)} expanded={expandedKey === 1} />
      <PaperExpandCollapse onExpandChange={onChange(2)} expanded={expandedKey === 2} />
      <PaperExpandCollapse onExpandChange={onChange(3)} expanded={expandedKey === 3} />
      <PaperExpandCollapse onExpandChange={onChange(4)} expanded={expandedKey === 4} />
    </PaperExpandCollapse>
  )
}
