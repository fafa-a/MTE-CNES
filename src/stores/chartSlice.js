import { createSlice } from "@reduxjs/toolkit"
import { ModeTypes, DataTypes, ObservationTypes } from "../config"

const initialState = {
	style: {
		default: {
			borderWidth: 1.2,
		},
		selected: {
			borderWidth: 2.5,
		},
	},
	[ObservationTypes.REFERENCE]: {
		style: {
			borderColor: "rgb(63, 78, 79)",
			backgroundColor: "rgba(63, 78, 79)",
			pointBackgroundColor: "rgba(63, 78, 79)",
		},
	},
	[ModeTypes.YEAR]: {
		style: {
			x2018: {
				[ObservationTypes.OPTIC]: {
					backgroundColor: "rgba(255, 0, 0)",
					borderColor: "rgba(255, 0, 0)",
					pointBackgroundColor: "rgba(255, 0, 0)",
				},
				[ObservationTypes.RADAR]: {
					backgroundColor: "rgba(255, 0, 0,0.56)",
					borderColor: "rgb(255, 0, 0,0.56)",
					pointBackgroundColor: "rgb(255, 0, 0,0.56)",
				},
				[ObservationTypes.REFERENCE]: {
					backgroundColor: "rgba(255, 0, 0,.13)",
					borderColor: "rgb(255, 0, 0,.13)",
					pointBackgroundColor: "rgb(255, 0, 0,.13)",
				},
			},
			x2019: {
				[ObservationTypes.OPTIC]: {
					backgroundColor: "rgba(255, 125,0)",
					borderColor: "rgba(255, 125,0)",
					pointBackgroundColor: "rgba(255, 125,0)",
				},
				[ObservationTypes.RADAR]: {
					backgroundColor: "rgb(255, 125, 0,0.56)",
					borderColor: "rgb(255, 125, 0,0.56)",
					pointBackgroundColor: "rgb(255, 125, 0,0.56)",
				},
				[ObservationTypes.REFERENCE]: {
					backgroundColor: "rgba(255, 125, 0,.33)",
					borderColor: "rgb(255, 125, 0,.33)",
					pointBackgroundColor: "rgb(255, 125, 0,.33)",
				},
			},
			x2020: {
				[ObservationTypes.OPTIC]: {
					backgroundColor: "rgba(0, 0, 255)",
					borderColor: "rgba(0, 0, 255)",
					pointBackgroundColor: "rgba(0, 0, 255)",
				},
				[ObservationTypes.RADAR]: {
					backgroundColor: "rgb(0, 0, 255,0.56)",
					borderColor: "rgb(0, 0, 255,0.56)",
					pointBackgroundColor: "rgb(0, 0, 255,0.56)",
				},
				[ObservationTypes.REFERENCE]: {
					backgroundColor: "rgba(0, 0, 250,0.33)",
					borderColor: "rgb(0, 0, 255,0.33)",
					pointBackgroundColor: "rgb(0, 0, 255,0.33)",
				},
			},
		},
	},
	[DataTypes.FILLING_RATE]: {
		style: {
			[ObservationTypes.OPTIC]: [
				{
					borderColor: "rgba(255, 0, 0)",
					backgroundColor: "rgba(255, 0, 0)",
					pointBackgroundColor: "rgb(255, 0, 0)",
				},
				{
					borderColor: "rgba(0, 255, 0)",
					backgroundColor: "rgba(0, 255, 0)",
					pointBackgroundColor: "rgb(0, 255, 0)",
				},
				{
					borderColor: "rgba(0, 0, 255)",
					backgroundColor: "rgba(0, 0, 255)",
					pointBackgroundColor: "rgb(0, 0, 255)",
				},
				{
					borderColor: "rgba(255, 255, 0)",
					backgroundColor: "rgba(255, 255, 0)",
					pointBackgroundColor: "rgb(255, 255, 0)",
				},
				{
					borderColor: "rgba(0, 255, 255)",
					backgroundColor: "rgba(0, 255, 255)",
					pointBackgroundColor: "rgb(0, 255, 255)",
				},
				{
					borderColor: "rgba(255, 0, 255)",
					backgroundColor: "rgba(255, 0, 255)",
					pointBackgroundColor: "rgb(255, 0, 255)",
				},
				{
					borderColor: "rgba(0, 100, 255 )",
					backgroundColor: "rgba(0, 100, 255 )",
					pointBackgroundColor: "rgb(0, 100, 255 )",
				},
				{
					borderColor: "rgba(255, 100, 0)",
					backgroundColor: "rgba(255, 100, 0)",
					pointBackgroundColor: "rgb(255, 100, 0)",
				},
				{
					borderColor: "rgba(0, 255, 100)",
					backgroundColor: "rgba(0, 255, 100)",
					pointBackgroundColor: "rgb(0, 255, 100)",
				},
				{
					borderColor: "rgba(255, 0, 100)",
					backgroundColor: "rgba(255, 0, 100)",
					pointBackgroundColor: "rgb(255, 0, 100)",
				},
			],
			[ObservationTypes.RADAR]: [
				{
					borderColor: "rgba(255, 0, 0,0.56)",
					backgroundColor: "rgba(255, 0, 0,0.56)",
					pointBackgroundColor: "rgb(255, 0, 0,0.56)",
				},
				{
					borderColor: "rgba(0, 255, 0,0.56)",
					backgroundColor: "rgba(0, 255, 0,0.56)",
					pointBackgroundColor: "rgb(0, 255, 0,0.56)",
				},
				{
					borderColor: "rgba(0, 0, 255,0.56)",
					backgroundColor: "rgba(0, 0, 255,0.56)",
					pointBackgroundColor: "rgb(0, 0, 255,0.56)",
				},
				{
					borderColor: "rgba(255, 255, 0,0.56)",
					backgroundColor: "rgba(255, 255, 0,0.56)",
					pointBackgroundColor: "rgb(255, 255, 0,0.56)",
				},
				{
					borderColor: "rgba(0, 255, 255,0.56)",
					backgroundColor: "rgba(0, 255, 255,0.56)",
					pointBackgroundColor: "rgb(0, 255, 255,0.56)",
				},
				{
					borderColor: "rgba(255, 0, 255,0.56)",
					backgroundColor: "rgba(255, 0, 255,0.56)",
					pointBackgroundColor: "rgb(255, 0, 255,0.56)",
				},
				{
					borderColor: "rgba(0, 100, 255,0.56)",
					backgroundColor: "rgba(0, 100, 255,0.56)",
					pointBackgroundColor: "rgb(0, 100, 255,0.56)",
				},
				{
					borderColor: "rgba(255, 100, 0,0.56)",
					backgroundColor: "rgba(255, 100, 0,0.56)",
					pointBackgroundColor: "rgb(255, 100, 0,0.56)",
				},
				{
					borderColor: "rgba(0, 255, 100,0.56)",
					backgroundColor: "rgba(0, 255, 100,0.56)",
					pointBackgroundColor: "rgb(0, 255, 100,0.56)",
				},
				{
					borderColor: "rgba(255, 0, 100,0.56)",
					backgroundColor: "rgba(255, 0, 100,0.56)",
					pointBackgroundColor: "rgb(255, 0, 100,0.56)",
				},
			],
			[ObservationTypes.REFERENCE]: [
				{
					borderColor: "rgba(255, 0, 0,0.33)",
					backgroundColor: "rgba(255, 0, 0,0.33)",
					pointBackgroundColor: "rgb(255, 0, 0,0.33)",
				},
				{
					borderColor: "rgba(0, 255, 0,0.33)",
					backgroundColor: "rgba(0, 255, 0,0.33)",
					pointBackgroundColor: "rgb(0, 255, 0,0.33)",
				},
				{
					borderColor: "rgba(0, 0, 255,0.33)",
					backgroundColor: "rgba(0, 0, 255,0.33)",
					pointBackgroundColor: "rgb(0, 0, 255,0.33)",
				},
				{
					borderColor: "rgba(255, 255, 0,0.33)",
					backgroundColor: "rgba(255, 255, 0,0.33)",
					pointBackgroundColor: "rgb(255, 255, 0,0.33)",
				},
				{
					borderColor: "rgba(0, 255, 255,0.33)",
					backgroundColor: "rgba(0, 255, 255,0.33)",
					pointBackgroundColor: "rgb(0, 255, 255,0.33)",
				},
				{
					borderColor: "rgba(255, 0, 255,0.33)",
					backgroundColor: "rgba(255, 0, 255,0.33)",
					pointBackgroundColor: "rgb(255, 0, 255,0.33)",
				},
				{
					borderColor: "rgba(0, 100, 255,0.33)",
					backgroundColor: "rgba(0, 100, 255,0.33)",
					pointBackgroundColor: "rgb(0, 100, 255,0.33)",
				},
				{
					borderColor: "rgba(255, 100, 0,0.33)",
					backgroundColor: "rgba(255, 100, 0,0.33)",
					pointBackgroundColor: "rgb(255, 100, 0,0.33)",
				},
				{
					borderColor: "rgba(0, 255, 100,0.33)",
					backgroundColor: "rgba(0, 255, 100,0.33)",
					pointBackgroundColor: "rgb(0, 255, 100,0.33)",
				},
				{
					borderColor: "rgba(255, 0, 100,0.33)",
					backgroundColor: "rgba(255, 0, 100,0.33)",
					pointBackgroundColor: "rgb(255, 0, 100,0.33)",
				},
			],
		},
	},
	[DataTypes.SURFACE]: {
		style: {
			[ObservationTypes.OPTIC]: [
				{
					borderColor: "rgba(155, 100, 186)",
					backgroundColor: "rgba(155, 100, 186)",
					pointBackgroundColor: "rgb(155, 100, 186)",
				},
				{
					borderColor: "rgba(0, 100, 186)",
					backgroundColor: "rgba(0, 100, 186)",
					pointBackgroundColor: "rgb(0, 100, 186)",
				},
				{
					borderColor: "rgba(0, 186, 186)",
					backgroundColor: "rgba(0, 186, 186)",
					pointBackgroundColor: "rgb(0, 186, 186)",
				},
				{
					borderColor: "rgba(186, 100, 186)",
					backgroundColor: "rgba(186, 100, 186)",
					pointBackgroundColor: "rgb(186, 100, 186)",
				},
				{
					borderColor: "rgba(0, 186, 100)",
					backgroundColor: "rgba(0, 186, 100)",
					pointBackgroundColor: "rgb(0, 186, 100)",
				},
				{
					borderColor: "rgba(186, 0, 100)",
					backgroundColor: "rgba(186, 0, 100)",
					pointBackgroundColor: "rgb(186, 0, 100)",
				},
				{
					borderColor: "rgba(0, 186, 0)",
					backgroundColor: "rgba(0, 186, 0)",
					pointBackgroundColor: "rgb(0, 186, 0)",
				},
				{
					borderColor: "rgba(186, 0, 0)",
					backgroundColor: "rgba(186, 0, 0)",
					pointBackgroundColor: "rgb(186, 0, 0)",
				},
				{
					borderColor: "rgba(0, 186, 186)",
					backgroundColor: "rgba(0, 186, 186)",
					pointBackgroundColor: "rgb(0, 186, 186)",
				},
				{
					borderColor: "rgba(186, 0, 186)",
					backgroundColor: "rgba(186, 0, 186)",
					pointBackgroundColor: "rgb(186, 0, 186)",
				},
			],
			[ObservationTypes.RADAR]: [
				{
					borderColor: "rgba(155, 100, 186,0.56)",
					backgroundColor: "rgba(155, 100, 186,0.56)",
					pointBackgroundColor: "rgb(155, 100, 186,0.56)",
				},
				{
					borderColor: "rgba(0, 100, 186,0.56)",
					backgroundColor: "rgba(0, 100, 186,0.56)",
					pointBackgroundColor: "rgb(0, 100, 186,0.56)",
				},
				{
					borderColor: "rgba(0, 186, 186,0.56)",
					backgroundColor: "rgba(0, 186, 186,0.56)",
					pointBackgroundColor: "rgb(0, 186, 186,0.56)",
				},
				{
					borderColor: "rgba(186, 100, 186,0.56)",
					backgroundColor: "rgba(186, 100, 186,0.56)",
					pointBackgroundColor: "rgb(186, 100, 186,0.56)",
				},
				{
					borderColor: "rgba(0, 186, 100,0.56)",
					backgroundColor: "rgba(0, 186, 100,0.56)",
					pointBackgroundColor: "rgb(0, 186, 100,0.56)",
				},
				{
					borderColor: "rgba(186, 0, 100,0.56)",
					backgroundColor: "rgba(186, 0, 100,0.56)",
					pointBackgroundColor: "rgb(186, 0, 100,0.56)",
				},
				{
					borderColor: "rgba(0, 186, 0,0.56)",
					backgroundColor: "rgba(0, 186, 0,0.56)",
					pointBackgroundColor: "rgb(0, 186, 0,0.56)",
				},
				{
					borderColor: "rgba(186, 0, 0,0.56)",
					backgroundColor: "rgba(186, 0, 0,0.56)",
					pointBackgroundColor: "rgb(186, 0, 0,0.56)",
				},
				{
					borderColor: "rgba(0, 186, 186,0.56)",
					backgroundColor: "rgba(0, 186, 186,0.56)",
					pointBackgroundColor: "rgb(0, 186, 186,0.56)",
				},
				{
					borderColor: "rgba(186, 0, 186,0.56)",
					backgroundColor: "rgba(186, 0, 186,0.56)",
					pointBackgroundColor: "rgb(186, 0, 186,0.56)",
				},
			],
			[ObservationTypes.REFERENCE]: [
				{
					borderColor: "rgba(155, 100, 186,0.33)",
					backgroundColor: "rgba(155, 100, 186,0.33)",
					pointBackgroundColor: "rgb(155, 100, 186,0.33)",
				},
				{
					borderColor: "rgba(0, 100, 186,0.33)",
					backgroundColor: "rgba(0, 100, 186,0.33)",
					pointBackgroundColor: "rgb(0, 100, 186,0.33)",
				},
				{
					borderColor: "rgba(0, 186, 186,0.33)",
					backgroundColor: "rgba(0, 186, 186,0.33)",
					pointBackgroundColor: "rgb(0, 186, 186,0.33)",
				},
				{
					borderColor: "rgba(186, 100, 186,0.33)",
					backgroundColor: "rgba(186, 100, 186,0.33)",
					pointBackgroundColor: "rgb(186, 100, 186,0.33)",
				},
				{
					borderColor: "rgba(0, 186, 100,0.33)",
					backgroundColor: "rgba(0, 186, 100,0.33)",
					pointBackgroundColor: "rgb(0, 186, 100,0.33)",
				},
				{
					borderColor: "rgba(186, 0, 100,0.33)",
					backgroundColor: "rgba(186, 0, 100,0.33)",
					pointBackgroundColor: "rgb(186, 0, 100,0.33)",
				},
				{
					borderColor: "rgba(0, 186, 0,0.33)",
					backgroundColor: "rgba(0, 186, 0,0.33)",
					pointBackgroundColor: "rgb(0, 186, 0,0.33)",
				},
				{
					borderColor: "rgba(186, 0, 0,0.33)",
					backgroundColor: "rgba(186, 0, 0,0.33)",
					pointBackgroundColor: "rgb(186, 0, 0,0.33)",
				},
				{
					borderColor: "rgba(0, 186, 186,0.33)",
					backgroundColor: "rgba(0, 186, 186,0.33)",
					pointBackgroundColor: "rgb(0, 186, 186,0.33)",
				},
				{
					borderColor: "rgba(186, 0, 186,0.33)",
					backgroundColor: "rgba(186, 0, 186,0.33)",
					pointBackgroundColor: "rgb(186, 0, 186,0.33)",
				},
			],
		},
	},
	[DataTypes.VOLUME]: {
		style: {
			[ObservationTypes.OPTIC]: [
				{
					backgroundColor: "rgba(0, 94, 184)",
					borderColor: "rgba(0, 94, 184)",
					pointBackgroundColor: "rgba(0, 94, 184)",
				},
				{
					borderColor: "rgba(0, 237, 222)",
					backgroundColor: "rgba(0, 237, 222)",
					pointBackgroundColor: "rgb(0, 237, 222)",
				},
				{
					borderColor: "rgba(0, 222, 237)",
					backgroundColor: "rgba(0, 222, 237)",
					pointBackgroundColor: "rgb(0, 222, 237)",
				},
				{
					borderColor: "rgba(237, 222, 0)",
					backgroundColor: "rgba(237, 222, 0)",
					pointBackgroundColor: "rgb(237, 222, 0)",
				},
				{
					borderColor: "rgba(222, 0, 237)",
					backgroundColor: "rgba(222, 0, 237)",
					pointBackgroundColor: "rgb(222, 0, 237)",
				},
				{
					borderColor: "rgba(137, 190, 222)",
					backgroundColor: "rgba(137, 190, 222)",
					pointBackgroundColor: "rgb(137, 190, 222)",
				},
				{
					borderColor: "rgba(222, 137, 190)",
					backgroundColor: "rgba(222, 137, 190)",
					pointBackgroundColor: "rgb(222, 137, 190)",
				},
				{
					borderColor: "rgba(190, 137, 222)",
					backgroundColor: "rgba(190, 137, 222)",
					pointBackgroundColor: "rgb(190, 137, 222)",
				},
				{
					borderColor: "rgba(222, 190, 137)",
					backgroundColor: "rgba(222, 190, 137)",
					pointBackgroundColor: "rgb(222, 190, 137)",
				},
				{
					borderColor: "rgba(190, 222, 137)",
					backgroundColor: "rgba(190, 222, 137)",
					pointBackgroundColor: "rgb(190, 222, 137)",
				},
			],
			[ObservationTypes.RADAR]: [
				{
					backgroundColor: "rgba(0, 94, 184,0.56)",
					borderColor: "rgb(0, 94, 184,0.56)",
					pointBackgroundColor: "rgb(0, 94, 184,0.56)",
				},
				{
					borderColor: "rgba(0, 237, 222,0.56)",
					backgroundColor: "rgba(0, 237, 222,0.56)",
					pointBackgroundColor: "rgb(0, 237, 222,0.56)",
				},
				{
					borderColor: "rgba(0, 222, 237,0.56)",
					backgroundColor: "rgba(0, 222, 237,0.56)",
					pointBackgroundColor: "rgb(0, 222, 237,0.56)",
				},
				{
					borderColor: "rgba(237, 222, 0,0.56)",
					backgroundColor: "rgba(237, 222, 0,0.56)",
					pointBackgroundColor: "rgb(237, 222, 0,0.56)",
				},
				{
					borderColor: "rgba(222, 0, 237,0.56)",
					backgroundColor: "rgba(222, 0, 237,0.56)",
					pointBackgroundColor: "rgb(222, 0, 237,0.56)",
				},
				{
					borderColor: "rgba(137, 190, 222,0.56)",
					backgroundColor: "rgba(137, 190, 222,0.56)",
					pointBackgroundColor: "rgb(137, 190, 222,0.56)",
				},
				{
					borderColor: "rgba(222, 137, 190,0.56)",
					backgroundColor: "rgba(222, 137, 190,0.56)",
					pointBackgroundColor: "rgb(222, 137, 190,0.56)",
				},
				{
					borderColor: "rgba(190, 137, 222,0.56)",
					backgroundColor: "rgba(190, 137, 222,0.56)",
					pointBackgroundColor: "rgb(190, 137, 222,0.56)",
				},
				{
					borderColor: "rgba(222, 190, 137,0.56)",
					backgroundColor: "rgba(222, 190, 137,0.56)",
					pointBackgroundColor: "rgb(222, 190, 137,0.56)",
				},
				{
					borderColor: "rgba(190, 222, 137,0.56)",
					backgroundColor: "rgba(190, 222, 137,0.56)",
					pointBackgroundColor: "rgb(190, 222, 137,0.56)",
				},
			],
			[ObservationTypes.REFERENCE]: [
				{
					backgroundColor: "rgba(0, 94, 184,.33)",
					borderColor: "rgb(0, 94, 184,.33)",
					pointBackgroundColor: "rgb(0, 94, 184,.33)",
				},
				{
					borderColor: "rgba(0, 237, 222,0.33)",
					backgroundColor: "rgba(0, 237, 222,0.33)",
					pointBackgroundColor: "rgb(0, 237, 222,0.33)",
				},
				{
					borderColor: "rgba(0, 222, 27,0.33)",
					backgroundColor: "rgba(0, 222, 27,0.33)",
					pointBackgroundColor: "rgb(0, 222, 27,0.33)",
				},
				{
					borderColor: "rgba(237, 222,27 ,0.33)",
					backgroundColor: "rgba(237, 222,27 ,0.33)",
					pointBackgroundColor: "rgb(237, 222,27 ,0.33)",
				},
				{
					borderColor: "rgba(222, 0, 237,0.33)",
					backgroundColor: "rgba(222, 0, 237,0.33)",
					pointBackgroundColor: "rgb(222, 0, 237,0.33)",
				},
				{
					borderColor: "rgba(137, 190, 222,0.33)",
					backgroundColor: "rgba(137, 190, 222,0.33)",
					pointBackgroundColor: "rgb(137, 190, 222,0.33)",
				},
				{
					borderColor: "rgba(222, 137, 190,0.33)",
					backgroundColor: "rgba(222, 137, 190,0.33)",
					pointBackgroundColor: "rgb(222, 137, 190,0.33)",
				},
				{
					borderColor: "rgba(190, 137, 222,0.33)",
					backgroundColor: "rgba(190, 137, 222,0.33)",
					pointBackgroundColor: "rgb(190, 137, 222,0.33)",
				},
				{
					borderColor: "rgba(222, 190, 137,0.33)",
					backgroundColor: "rgba(222, 190, 137,0.33)",
					pointBackgroundColor: "rgb(222, 190, 137,0.33)",
				},
				{
					borderColor: "rgba(190, 222, 137,0.33)",
					backgroundColor: "rgba(190, 222, 137,0.33)",
					pointBackgroundColor: "rgb(190, 222, 137,0.33)",
				},
			],
		},
	},
}

export const chartSlice = createSlice({
	name: "chart",
	initialState,
	reducers: {
		addColor: (state, action) => {
			const { dataType, obsType, color } = action.payload
			state[dataType].style[obsType].push({
				borderColor: color,
				backgroundColor: color,
				pointBackgroundColor: color,
			})
		},
	},
})

export const { addColor } = chartSlice.actions

export default chartSlice.reducer
