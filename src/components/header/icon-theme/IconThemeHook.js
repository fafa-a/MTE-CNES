import { useCallback, useEffect, useState } from "react"
export const useIconThemeHook = (toggleTheme) => {
	const handleTheme = useCallback(() => {
		toggleTheme()
	}, [toggleTheme])
	return { handleTheme }
}
