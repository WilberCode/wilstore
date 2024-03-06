'use client'
import TimeAgo from 'react-timeago'

import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
const formatter = buildFormatter(spanishStrings)
type timeProps = {
    date:string;
    className?:string;
}
const Time = ({date,className}:timeProps) => {
  return <TimeAgo date={date} formatter={formatter}  className={className} /> 
}

export default Time