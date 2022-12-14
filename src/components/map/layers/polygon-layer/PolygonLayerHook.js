import { useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLake, updateActivelakes } from '@/stores/stateLakeSlice'
import { updateModeVolume } from '../../../../stores/dataSlice'
import { DataTypes, DurationTypes, ModeTypes } from '../../../../config'
import { addLakeChartOptions } from '../../../../stores/lakesChartOptionsSlice'
import { addYearsChartOptions } from '../../../../stores/yearsChartOptionsSlice'

export default function usePolygonLayerHook() {
	const [color, setColor] = useState('blue')
	const [zoomLevel, setZoomLevel] = useState(null)
	const [containerHeight, setContainerHeight] = useState(null)
	const [mapY, setMapY] = useState(null)
	const [coordId, setCoordId] = useState({
		id: '',
		coord: [],
	})
	const [obsDepth, setObsDepth] = useState(null)
	const { VOLUME, DAY, YEAR, PERIOD, dataType } = useSelector(
		state => state.form
	)
	const { active, loaded } = useSelector(state => state.stateLake)
	const { information } = useSelector(state => state.information)
	const { lakesChartOptions } = useSelector(state => state)
	const { data } = useSelector(state => state.data)
	const map = useMap()
	const dispatch = useDispatch()
	const mapEvents = useMapEvents({
		zoomend: () => {
			setZoomLevel(mapEvents.getZoom())
		},
	})

	const resizeMap = useCallback(
		value => {
			const container = document.getElementsByClassName('leaflet-container')
			if (container) {
				map.invalidateSize(true)
				map._onResize(true)
				container[0].style.height = value
			}
		},
		[map]
	)

	const centerPolygon = useCallback(() => {
		map.setView(coordId.coord, 11)
	}, [coordId.coord])

	useEffect(() => {
		if (active.length >= 2) return
		if (
			active.length === 1 &&
			Object.keys(data).length === 1 &&
			containerHeight !== '45%'
		) {
			resizeMap('45%')
			setContainerHeight('45%')
		}
		if (active.length === 0 && containerHeight !== '100%') {
			resizeMap('100%')
			setContainerHeight('100%')
		}
	}, [active, resizeMap, data])

	useEffect(() => {
		if (containerHeight === '100%' && coordId.coord.length > 0) {
			map.invalidateSize(true)
			map.setView(coordId.coord, map.getZoom() - 1)
		}
	}, [containerHeight])

	useEffect(() => {
		if (!coordId.id) return
		const container = document.getElementsByClassName('leaflet-container')
		if (container[0].style.height == '45%' && active.length > 0) {
			setColor('#CDF0EA')
			centerPolygon()
		}
	}, [coordId.id, active])

	useEffect(() => {
		if (active.length < 1) {
			setColor('#00FFD1')
		}
	}, [active])

	useEffect(() => {
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
	}, [DAY, PERIOD])

	const centerSelectedPolygon = useCallback(() => {
		if (
			Object.entries(lakesChartOptions)
				.map(([id, { selected }]) => {
					return { id: id.toString(), selected }
				})
				.filter(({ selected }) => selected).length === 0
		)
			return

		const { lakeId } = Object.entries(lakesChartOptions)
			.map(([id, { selected }]) => {
				return { lakeId: id.toString(), selected }
			})
			.filter(({ selected }) => selected)[0]
		const { id, lakeCoord } = information[lakeId]
		setCoordId({
			id: id.toString(),
			coord: lakeCoord,
		})
	}, [lakesChartOptions])

	useEffect(() => {
		centerSelectedPolygon()
	}, [centerSelectedPolygon])

	const activeLake = useCallback(
		(id, coordWW) => {
			setCoordId({
				id: id.toString(),
				coord: coordWW,
			})
			dispatch(addLake({ id: id.toString() }))
		},
		[dispatch]
	)

	const updateLake = useCallback(
		id => {
			dispatch(updateActivelakes({ id: id.toString() }))
			dispatch(updateModeVolume({ id: id.toString() }))
			dispatch(addLakeChartOptions({ id: id.toString() }))
		},
		[dispatch, YEAR, dataType, obsDepth, data, active]
	)

	useEffect(() => {
		if (active.length === 0) return
		if (YEAR && data[active.at(-1)]) {
			const dataYears = data[active.at(-1)][dataType][obsDepth].year
			const years = Object.keys(dataYears)
			dispatch(addYearsChartOptions({ years }))
		}
	}, [dispatch, YEAR, active, dataType, obsDepth, loaded, data])

	return {
		activeLake,
		centerPolygon,
		id: coordId.id,
		color,
		zoomLevel,
		loaded,
		active,
		updateLake,
	}
}
