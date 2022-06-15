import L from "leaflet"
import transparentPng from "../images/transparent.png"

const leafIcon = L.Icon.extend({
  options: {
    iconSize: [0, 0],
  },
})

export const noSizeIcon = new leafIcon({ iconUrl: transparentPng })
