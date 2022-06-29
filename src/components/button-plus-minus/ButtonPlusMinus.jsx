import useButtonPlusMinusHook from "./ButtonPlusMinusHook"
export const ButtonPlusMinus = ({
  id,
  name,
  removeLakeActive,
  addLakeToCompare,
  coordinates,
}) => {
  const { clickPlus, clickMinus } = useButtonPlusMinusHook({
    addLakeToCompare,
    id,
    name,
    removeLakeActive,
    coordinates,
  })

  return (
    <div>
      <button onClick={clickMinus}>-</button>
      Compare
      <button onClick={clickPlus}>+</button>
    </div>
  )
}
