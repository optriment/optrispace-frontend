const JobDescription = ({ description }) => {
  return (
    <div style={{ textAlign: 'justify' }}>
      {description.split('\n').map((str, idx) => (
        <div key={idx}>
          {str}

          <br />
        </div>
      ))}
    </div>
  )
}

export default JobDescription
