import "./BanList.css"

export const BanList = ({list}) => {
  const uniqueList = [...new Set(list)]
  return (
    <div className="banList-container">
      {uniqueList.length > 0 && <h2>🐶 The Dog House 🏠</h2>}
      <ul>
        {uniqueList.map((attribute, index) => {
          return <li key={index}>{attribute}</li>
        })}
      </ul>
    </div>
  )
}