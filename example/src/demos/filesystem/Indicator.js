import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react'
import { isEqual } from 'lodash'
import ArrowDown from '@material-ui/icons/ArrowDropDown'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import ArrowRight from '@material-ui/icons/ArrowRight'

const useIndicatorStyles = makeStyles({
  iconButton: {
    border: `1px solid`,
    padding: '0px',
  },
  icon: {
    width: '12px',
    height: '12px'
  }
});

const FileSystemIndicator = React.memo(({ variant = 'file', expanded, position, toggleExpansion }) => {
  if (variant === 'file') {
    return null;
  }
  const classes = useIndicatorStyles();
  let IconToMount = null;
  if (!expanded && position === 'start') {
    IconToMount = ArrowRight;
  }
  if (!expanded && position === 'end') {
    IconToMount = ArrowLeft;
  }
  if (expanded) {
    IconToMount = ArrowDown;
  }
  if (!IconToMount) {
    return null;
  }
  return (
    <IconButton color="primary"  className={classes.iconButton} onClick={toggleExpansion} size="small">
      <SvgIcon className={classes.icon}>
        <IconToMount />
      </SvgIcon>
    </IconButton>
  );
}, isEqual);

export default FileSystemIndicator;
