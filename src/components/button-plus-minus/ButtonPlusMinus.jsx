import useButtonPlusMinusHook from "./ButtonPlusMinusHook"
export const ButtonPlusMinus = ({
  id,
  name,
  getLakeIdName,
  removeLakeActive,
}) => {
  const { clickPlus, clickMinus } = useButtonPlusMinusHook({
    getLakeIdName,
    id,
    name,
    removeLakeActive,
  })
  return (
    <div>
      <button onClick={clickMinus}>-</button>
      Compare
      <button onClick={clickPlus}>+</button>
    </div>
  )
}
