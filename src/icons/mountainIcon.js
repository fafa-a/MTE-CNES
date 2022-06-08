import L from "leaflet"
import mountainPng from "../images/mountainPng.png"

const leafIcon = L.Icon.extend({
  options: {
    iconSize: [35, 23],
    iconAnchor: [17, 16],
    tooltipAnchor: [15, -5],
  },
})

export const mountainIcon = new leafIcon({ iconUrl: mountainPng })
