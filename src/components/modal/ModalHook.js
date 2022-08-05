import { useState, useEffect, useCallback } from "react"

export default function useMapHook({ isOpen, handleSetNoDataLake }) {
	const [open, setOpen] = useState(isOpen)

	const handleClose = useCallback(() => {
		setOpen(!open)
		handleSetNoDataLake()
	}, [setOpen])

	return {
		open,
		handleClose,
	}
}
