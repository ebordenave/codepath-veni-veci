import "./AttributesButton.css"

export const AttributesButton = ({attribute, backgroundColor, onClick}) => {
  attribute = (!attribute) ? "No attributes yet" : attribute
  const buttonStyle = {
    backgroundColor: backgroundColor,
  }
  return (
    <button style={buttonStyle} onClick={onClick}>{attribute}</button>
  )
}