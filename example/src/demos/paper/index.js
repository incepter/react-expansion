import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpandCollapse from 'react-expansion'
import DemoComponent from '../children'
import Paper from '@material-ui/core/Paper'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { ExpansionDivider } from '../../divider/Divider'
import { Typography } from '@material-ui/core'
import FileSystemIndicator from '../filesystem/Indicator'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
  root: {
    marginTop: 8,
    border: '1px solid #C5CBDB',
    borderRadius: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: '1rem',
    color: '#6779A9',
    cursor: 'pointer'
  },
  contentExpanded: {
    padding: 24,
    borderTop: '1px solid #C5CBDB',
  },
  header: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  }
})

const Label = ({toggleExpansion, expanded, children, ...rest}) => (
  <Typography onClick={toggleExpansion} {...rest}>{expanded ? 'Click to collapse' : 'Click to expand'}</Typography>
)
const Actions = ({onClick}) => (<Tooltip title="check console after click">
  <IconButton color="secondary" size="small"
              onClick={onClick}><CloseIcon/></IconButton>
</Tooltip>)

export function PaperExpandCollapse({children, ...rest}) {
  const classes = useStyles()

  function onDelete() {
    console.log('deleting element may be ?')
  }

  return (
    <ExpandCollapse
      keepMounted
      Component={Paper}
      LabelComponent={Label}
      ExpansionComponent="div"
      ActionsComponent={Actions}
      DividerComponent={ExpansionDivider}
      ComponentProps={{
        className: classes.root,
        elevation: 0,
      }}
      LabelProps={{
        component: 'span',
        className: classes.label
      }}
      ExpansionProps={{
        className: classes.header
      }}
      ActionsProps={{
        onClick: onDelete,
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

export default PaperExpandCollapse
