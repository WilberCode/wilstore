declare module 'react-timeago/lib/language-strings/es' {
    const spanishStrings: { [key: string]: string };
    export default spanishStrings;
  }
  
  declare module 'react-timeago/lib/formatters/buildFormatter' {
    import { Formatter } from 'react-timeago';
    const buildFormatter: (strings: { [key: string]: string }) => Formatter;
    export default buildFormatter;
  }
  