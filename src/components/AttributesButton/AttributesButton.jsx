import "./AttributesButton.css"

export const AttributesButton = ({attribute , backgroundColor, onClick}) => {
  return attribute && attribute.length > 0 ? (
    <button style={{backgroundColor}} onClick={onClick}>
      {attribute}
    </button>
  ) : null
}