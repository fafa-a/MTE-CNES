import usePolygonLayerHook from "./PolygonLayerHook"
import { LayerGroup, Polygon, Popup, Tooltip } from "react-leaflet"
import { v4 as uuid } from "@lukeed/uuid"
import { useState, useEffect } from "react"
import { ButtonPlusMinus } from "@components/button-plus-minus/ButtonPlusMinus"
import { createRef } from "react"
import { styled, theme } from "@/stitches.config"

const StyledPopup = styled(Popup, {
  [".leaflet-popup-content-wrapper"]: {
    borderRadius: theme.borderRadius.xs,
  },

  [".leaflet-popup-content"]: {
    minWidth: "max-content",
    margin: "0 10px",
  },

  [".leaflet-popup-content p"]: {
    margin: "10px 0",
  },

  [".leaflet-popup-close-button"]: {
    display: "none",
  },
})

export const PolygonLayer = ({
  data,
  handleChange,
  removeLakeActive,
  addLakeToCompare,
}) => {
  const [layer, setLayer] = useState(null)
  const { centerPolygon, getLakeIdName, map } = usePolygonLayerHook({
    data,
    handleChange,
    removeLakeActive,
  })

  const refsById = useMemo(() => {
    const refs = {}
    data.features.forEach(feature => {
      const { ID_SWOT } = feature.properties
      refs[ID_SWOT] = createRef(null)
    })
    return refs
  }, [data])
  useEffect(() => {
    setLayer(
      data.features.map(feature => {
        const { ID_SWOT, DAM_NAME, LONG_WW, LAT_WW } = feature.properties
        const { coordinates } = feature.geometry
        const reversedMultiPolygons = coordinates[0].map(polygon =>
          polygon.map(p => [p[1], p[0]])
        )

        return (
          <Polygon
            key={uuid()}
            positions={reversedMultiPolygons}
            data-coordinates={[LAT_WW, LONG_WW]}
            eventHandlers={{
              click: el => {
                el.target.closePopup()
                const coordinates = el.target.options["data-coordinates"]
                centerPolygon(coordinates)
                getLakeIdName(ID_SWOT, DAM_NAME, coordinates)
              },
              contextmenu: e => {
                refsById[ID_SWOT].current.setLatLng(e.latlng).openOn(map)
              },
            }}
          >
            <Tooltip>
              <h3>{DAM_NAME}</h3>
            </Tooltip>
            <StyledPopup ref={refsById[ID_SWOT]}>
              <ButtonPlusMinus
                id={ID_SWOT}
                name={DAM_NAME}
                coordinates={[LAT_WW, LONG_WW]}
                addLakeToCompare={addLakeToCompare}
                removeLakeActive={removeLakeActive}
              />
            </StyledPopup>
          </Polygon>
        )
      })
    )
  }, [])

  return <LayerGroup>{layer}</LayerGroup>
}
