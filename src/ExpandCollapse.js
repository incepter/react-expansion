import React from 'react'
import PropTypes from 'prop-types'

const ExpandCollapse = React.forwardRef(({
  expanded: controlledExpansionState,
  initialValue = false,
  labelPosition = 'start',
  actionsPosition = 'end',
  indicatorPosition = 'end',
  Component = React.Fragment,
  LabelComponent,
  ActionsComponent,
  DividerComponent,
  ExpansionComponent,
  IndicatorComponent,
  LabelProps = {},
  ActionsProps = {},
  DividerProps = {},
  ExpansionProps = {},
  IndicatorProps = {},
  ComponentProps = {},
  contentContainerProps = {},
  actions,
  children,
  label,
  keepMounted
}, ref) => {
  const isControlled = controlledExpansionState !== undefined
  const [expansionState, setExpansionState] = React.useState(initialValue)
  const expanded = isControlled ? controlledExpansionState : expansionState

  const expand = React.useCallback(() => {
    // not controlled and collapsed
    if (!isControlled && !expansionState) {
      setExpansionState(true)
    }
  }, [])
  const collapse = React.useCallback(() => {
    // not controlled and expanded
    if (!isControlled && expansionState) {
      setExpansionState(false)
    }
  }, [])
  const toggleExpansion = React.useCallback(e => {
    if (!isControlled) {
      e?.stopPropagation?.()
      setExpansionState(old => !old)
    }
  }, [])

  const rendered = React.useRef(expanded)
  if (!rendered.current && expanded) {
    rendered.current = true
  }
  const contentContainerRef = React.useRef(null)
  React.useImperativeHandle(ref, () => ({
    expand,
    collapse,
    toggleExpansion
  }))
  React.useLayoutEffect(() => {
    if (keepMounted && rendered.current) {
      contentContainerRef.current.style.setProperty?.('display', expanded ? 'block' : 'none')
    }
  }, [expanded])

  const propsToPassDown = {
    expanded,
    toggleExpansion
  }

  function renderLabel () {
    if (!LabelComponent) {
      return label
    }
    return <LabelComponent {...LabelProps} {...propsToPassDown} position={labelPosition}>{label}</LabelComponent>
  }
  function renderIndicator () {
    if (!IndicatorComponent) {
      return null
    }
    return <IndicatorComponent {...IndicatorProps} {...propsToPassDown} position={indicatorPosition} />
  }
  function renderDivider() {
    if (!DividerComponent) {
      return null
    }
    return <div style={{ flexGrow: 2 }}><DividerComponent {...DividerProps} {...propsToPassDown} /></div>
  }
  function renderActions() {
    if (!ActionsComponent) {
      return actions
    }
    return (
      <ActionsComponent {...DividerProps} {...propsToPassDown} position={actionsPosition}>{actions}</ActionsComponent>
    )
  }
  function renderExpansionHeader() {
    const ExpansionHeader = ExpansionComponent || 'div'
    const calculatedProps = ExpansionHeader === 'div' ? {} : {...propsToPassDown}

    const calculatedStyle = {
      ...ExpansionProps?.style,
      display: 'flex',
      alignItems: 'center'
    }
    calculatedProps.style = {...calculatedStyle}

    return (
      <ExpansionHeader {...ExpansionProps} {...calculatedProps}>
        {indicatorPosition === 'start' && renderIndicator()}
        {labelPosition === 'start' && renderLabel()}
        {actionsPosition === 'start' && renderActions()}
        {renderDivider()}
        {actionsPosition === 'end' && renderActions()}
        {labelPosition === 'end' && renderLabel()}
        {indicatorPosition === 'end' && renderIndicator()}
      </ExpansionHeader>
    )
  }

  const contentWrapperProps = expanded ? contentContainerProps : {}
  return (
    <Component {...ComponentProps}>
      {renderExpansionHeader()}
      <div ref={contentContainerRef} {...contentWrapperProps}>
        {keepMounted && rendered.current && children}
        {!keepMounted && expanded && children}
      </div>
    </Component>
  )
})

ExpandCollapse.propTypes = {
  // if set, the component becomes controlled
  expanded: PropTypes.bool,
  // this means it's uncontrolled, but if expanded is present, it overrides initialValue
  initialValue: PropTypes.bool,

  labelPosition: PropTypes.oneOf(['start', 'end']),
  actionsPosition: PropTypes.oneOf(['start', 'end']),
  indicatorPosition: PropTypes.oneOf(['start', 'end']),

  Component: PropTypes.func,
  LabelComponent: PropTypes.func,
  ActionsComponent: PropTypes.func,
  DividerComponent: PropTypes.func,
  IndicatorComponent: PropTypes.func,
  ExpansionComponent: PropTypes.func,

  LabelProps: PropTypes.object,
  ActionsProps: PropTypes.object,
  DividerProps: PropTypes.object,
  IndicatorProps: PropTypes.object,
  ComponentProps: PropTypes.object,
  ExpansionProps: PropTypes.object,

  contentContainerProps: PropTypes.object,

  actions: PropTypes.any,
  children: PropTypes.any,
  label: PropTypes.element,

  keepMounted: PropTypes.bool
}

export default ExpandCollapse
