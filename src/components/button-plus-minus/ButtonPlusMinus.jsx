import useButtonPlusMinusHook from "./ButtonPlusMinusHook"
export const ButtonPlusMinus = ({ id, name, removeLakeActive, addLakeToCompare }) => {
  const { clickPlus, clickMinus } = useButtonPlusMinusHook({
    addLakeToCompare,
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
