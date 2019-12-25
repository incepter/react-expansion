import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpandCollapse from 'react-expansion'
import DemoComponent from '../children'
import { ExpansionDivider } from '../../divider/Divider'
import { Typography } from '@material-ui/core'
import FileSystemIndicator from '../filesystem/Indicator'

const useStyles = makeStyles({
  label: {
    marginLeft: 8,
    fontSize: '1rem',
    color: '#6779A9',
    cursor: 'pointer'
  },
  contentExpanded: {
    padding: 24,
    border: '1px dashed #C5CBDB',
    borderTop: 'none'
  },
  header: {
    border: '1px dashed #C5CBDB',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
  }
})

const Label = ({toggleExpansion, expanded, children, ...rest}) => (
  <Typography {...rest}>Inline collapsible</Typography>
)

export function InlineExpandCollapse({children, ...rest}) {
  const classes = useStyles()

  return (
    <ExpandCollapse
      keepMounted
      initialValue={false}
      LabelComponent={Label}
      ExpansionComponent="div"
      DividerComponent={ExpansionDivider}
      IndicatorComponent={FileSystemIndicator}
      IndicatorProps={{
        variant: 'folder'
      }}
      indicatorPosition="start"
      LabelProps={{
        component: 'span',
        className: classes.label
      }}
      ExpansionProps={{
        className: classes.header
      }}
      contentContainerProps={{
        className: classes.contentExpanded,
      }}
      {...rest}
    >
      {children || <DemoComponent/>}
    </ExpandCollapse>
  )
}

export default InlineExpandCollapse
