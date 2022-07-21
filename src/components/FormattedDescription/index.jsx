export const FormattedDescription = ({ description }) => {
  return (
    <div style={{ textAlign: 'justify' }}>
      {description
        .trim()
        .split('\n')
        .map((str, idx) => (
          <div key={idx}>
            {str}

            <br />
          </div>
        ))}
    </div>
  )
}
