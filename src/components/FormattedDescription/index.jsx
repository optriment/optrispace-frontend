import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const FormattedDescription = ({ description }) => {
  return (
    <div style={{ textAlign: 'justify' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
    </div>
  )
}
