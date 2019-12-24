import React from 'react'
import * as PropTypes from 'prop-types'

export function ExpansionDivider({ variant = 'dashed', color = '#C5CBDB', height = '1px' }) {
  return (
    <hr style={{
      border: 'none',
      margin: '10px',
      borderTop: `${height} ${variant} ${color}`
    }}/>
  )
}

ExpansionDivider.propTypes = {
  variant: PropTypes.oneOf(['dashed', 'solid']),
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
