import { Prism } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Pre = ({ children, className }) => {
  const lang = className.split('-')[1]

  return (
    <Prism language={lang} style={darcula}>
      {children}
    </Prism>
  )
}

export default Pre
