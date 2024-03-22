import "./DS_Button.css"
export const DS_Button = ({text, onClick, backgroundColor}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
  }
  return (
    <button onClick={onClick} style={buttonStyle}>{text}</button>
  )
}