import { useSelector } from "react-redux"
import { toggleActiveYears } from "../../stores/lakesSlice"
import { clearActiveLakes } from "../../stores/stateLakeSlice"
import { useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { DurationTypes, ModeTypes } from "../../config"
export default function useLakeBoardHook() {
  const [dataSelection, setDataSelection] = useState([])
  const [obsDepth, setObsDepth] = useState()
  const [lastMode, setLastMode] = useState(null)
  const [activeLakesInfo, setActiveLakesInfo] = useState([])

  const { activeLakes, activeYears, dataLakes, yearsVisible } = useSelector(
    (state) => state.lakes
  )
  const { YEAR, VOLUME, dataType, DAY, PERIOD } = useSelector(
    (state) => state.form
  )
  const { active } = useSelector((state) => state.stateLake)
  const { data, mode } = useSelector((state) => state.data)
  const { yearsChartOptions } = useSelector((state) => state)
  const { information } = useSelector((state) => state.information)
  const dispatch = useDispatch()


  useEffect(() => {
    console.log({ activeLakesInfo })
  }, [activeLakesInfo])

  useEffect(() => {
    console.log({ dataSelection })
  }, [dataSelection])

  useEffect(() => {
    if (DAY) {
      setObsDepth(DurationTypes.DAY)
    }
    if (PERIOD) {
      setObsDepth(DurationTypes.PERIOD)
    }
  }, [DAY, PERIOD])

  useEffect(() => {
    if (YEAR) {
      setLastMode(ModeTypes.YEAR)
    }
    if (VOLUME) {
      setLastMode(ModeTypes.VOLUME)
    }
  }, [VOLUME, YEAR])


  // useEffect(() => {
  //   if (!YEAR && active.at(-1) !== activeLakesInfo.map((el) => el.id).at(-1)) {
  //     const info = Object.entries(information).filter(([id]) => {
  //       return active.includes(id)
  //     })
  //     const lakesIdName = info
  //       .map(([id, { name }]) => ({ id, name }))
  //       .filter((el) => el.id === active.at(-1))[0]
  //     const activeLakesInfoId = activeLakesInfo.map((el) => el.id)
  //     const newIdName = Object.values(lakesIdName).filter((el) =>
  //       el.id !== activeLakesInfoId.includes(el.id)
  //
  //     )
  //     console.log({ lakesIdName, activeLakesInfoId, newIdName })
  //     setActiveLakesInfo([...activeLakesInfo, lakesIdName])
  //   }
  //
  //   if (YEAR && Object.keys(yearsChartOptions)) {
  //     const yearsId = Object.keys(yearsChartOptions).map((el) => {
  //       return {
  //         id: el,
  //         name: el
  //       }
  //     })
  //     setActiveLakesInfo(yearsId)
  //   }
  // }, [active, YEAR, yearsChartOptions])

  useEffect(() => {
    console.log('useEffect work')
    if (active.length === 0) {
      console.log("reset")
      setActiveLakesInfo([])
      return
    }
    if (!YEAR && data[active.at(-1)]?.[dataType]?.[obsDepth]) {
      console.log("01")
      if (
        yearsChartOptions &&
        activeLakesInfo
          .map((el) => el.id)
          .includes(Object.keys(yearsChartOptions)[0])
      ) {
        console.log("02")
        const info = Object.entries(information).filter(([id]) => {
          return active.includes(id)
        })
        console.log({ info })
        const allLakesActiveIdName = info
          .map(([id, { name }]) => ({ id, name }))
          .filter((el) => active.includes(el.id))
        console.log({ allLakesActiveIdName })
        setActiveLakesInfo(activeLakes)
      }
      if (
        !lastMode &&
        active.at(-1) !== activeLakesInfo.map((el) => el.id).at(-1)) {
        console.log("03")
        const info = Object.entries(information).filter(([id]) => {
          return active.includes(id)
        })
        const lakesIdName = info
          .map(([id, { name }]) => ({ id, name }))
          .filter((el) => el.id === active.at(-1))[0]
        const activeLakesInfoId = activeLakesInfo.map((el) => el.id)
        const newIdName = Object.values(lakesIdName).filter((el) =>
          el.id !== activeLakesInfoId.includes(el.id)

        )
        setActiveLakesInfo([...activeLakesInfo, lakesIdName])
      }
      //      if (activeLakesInfo.length === 0) {
      //       console.log("init")
      //       const info = Object.entries(information).filter(([id]) => {
      //         return active.includes(id)
      //       })
      //       const lakesIdName = info
      //         .map(([id, { name }]) => ({ id, name }))
      //         .filter((el) => el.id === active.at(-1))[0]
      //       console.log(lakesIdName)
      //       setActiveLakesInfo([lakesIdName])
      //
      //     }
      if (lastMode === DurationTypes.YEAR) {
        console.log("04")
        const info = Object.entries(information).filter(([id]) => {
          return active.includes(id)
        })
        console.log({ info })
        const allLakesActiveIdName = info
          .map(([id, { name }]) => ({ id, name }))
          .filter((el) => active.includes(el.id))
        console.log({ allLakesActiveIdName })
        setActiveLakesInfo(allLakesActiveIdName)
      }
      if (!lastMode && activeLakesInfo.length > active.length) {
        console.log("05")
        const activeLakesInfoFiltered = activeLakesInfo.filter((lake) =>
          active.includes(lake.id)

        )
        console.log({ activeLakesInfoFiltered })
        setActiveLakesInfo(activeLakesInfoFiltered)
      }
      setLastMode(null)
    }
    if (YEAR && Object.keys(yearsChartOptions)) {
      console.log("06")
      const yearsId = Object.keys(yearsChartOptions).map((el) => {
        return {
          id: el,
          name: el
        }
      })
      setActiveLakesInfo(yearsId)
    }
  }, [YEAR, active, data, yearsChartOptions, information])

  const clearSelection = useCallback(() => {
    if (!YEAR) {
      dispatch(clearActiveLakes())
    }
    if (YEAR) {
      dispatch(toggleActiveYears())
    }
  }, [dispatch, YEAR])

  return {
    dataSelection,
    clearSelection,
    VOLUME,
    activeLakesInfo
  }
}
