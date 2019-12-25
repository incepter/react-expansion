import React from 'react'
import ExpandCollapse from 'react-expansion'
import FileSystemIndicator from './Indicator'
import FileSystemLabel from './Label'

function FileUnit({children, filename, variant, fileUrl, ...rest}) {
  return (
    <ExpandCollapse
      keepMounted
      Component="div"
      ComponentProps={{
        style: {
          width: '300px',
        }
      }}
      indicatorPosition='start'
      ExpansionComponent='div'
      ExpansionProps={{style: {display: 'flex', alignItems: 'center'}}}
      LabelComponent={FileSystemLabel}
      LabelProps={{filename, variant, fileUrl}}
      label={filename}
      IndicatorComponent={FileSystemIndicator}
      IndicatorProps={{variant}}
      contentContainerProps={{
        style: {
          marginLeft: 24
        }
      }}
      {...rest}
    >
      {children}
    </ExpandCollapse>
  )
}

function Tree({data, expanded, base}) {
  return (
    <FileUnit
      initialValue={expanded}
      variant="folder"
      filename={data.filename}
    >
      {data?.children.length >= 0 && <FileSystem base={base} tree={data.children} expanded={false}/>}
    </FileUnit>
  )
}

function FileSystem({tree, base = '', expanded = true}) {
  if (!Array.isArray(tree) || tree?.length === 0) {
    return null
  }
  return (
    <>
      {tree.map(element => {
        if (!Array.isArray(element.children)) {
          return (
            <FileUnit
              fileUrl={`https://docs.api.io/file=${base}/${element.filename}`}
              key={element.filename}
              filename={element.filename}
            />
          )
        }
        return <Tree key={element.filename} base={`${base}/${element.filename}`} data={element} expanded={expanded}/>
      })}
    </>
  )
}

export default function FileSystemExpandCollapseDemo() {
  const tree = [
    {
      filename: 'src',
      children: [
        {
          filename: 'app',
          children: [
            {
              filename: 'tests',
              children: [
                {
                  filename: 'index.test.js'
                }
              ]
            },
            {
              filename: 'store',
              children: [
                {
                  filename: 'reducer.js'
                },
                {
                  filename: 'saga.js'
                }
              ]
            },
            {
              filename: 'index.js'
            },
            {
              filename: 'index.css'
            },
            {
              filename: 'Exports.js'
            },
          ]
        },
        {
          filename: 'index.js',
        },
        {
          filename: 'package.json',
        },
        {
          filename: '.gitignore',
        },
        {
          filename: 'server.js',
        },
        {
          filename: 'store.js',
        }
      ]
    }
  ]
  return (
    <div style={{
      width: '50%',
      margin: 'auto'
    }}>
      <FileSystem tree={tree}/>
    </div>
  )
}
