'use client'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
const LayoutWrapper = ({children}:any) => {

    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
    useServerInsertedHTML(() => {
      const styles = styledComponentsStyleSheet.getStyleElement()
      styledComponentsStyleSheet.instance.clearTag()
      return styles
    })
   
    if (typeof window !== 'undefined') return <>{children}</>
   
    

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
  )
}

export default LayoutWrapper