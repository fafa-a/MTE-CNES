import useLakeSelectionHook from "./LakeSelectionHook"

export const LakeSelection = ({ id, lakeName }) => {
  const { handleClick } = useLakeSelectionHook(id)
  return (
    <div>
      <button onClick={handleClick}>X</button>
      <span>{lakeName}</span>
      <button>?</button>
    </div>
  )
}
