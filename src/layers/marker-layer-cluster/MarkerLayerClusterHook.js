export default function useMarkerLayerClusterHook(data) {
  const coordinates = data.features.map(feature => {
    const { LONG_WW, LAT_WW } = feature.properties
    return [LAT_WW, LONG_WW]
  })

  return { coordinates }
}
