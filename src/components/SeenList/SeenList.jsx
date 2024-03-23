import "./SeenList.css"

export const SeenList = ({list}) => {
  const uniqueList = [...new Set(list)]
  return (
    <div className="seenList-container">
      {uniqueList.length > 0 && (
        <>
          <h2>🐾  Su-paw-stars 🌟</h2>
        </>
      )}
      <ul>
        {uniqueList.map((attribute, index) => {
          return <li key={index}>{attribute}</li>
        })}
      </ul>
    </div>
  )
}