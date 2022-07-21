/* eslint-disable no-undef */
export const useIconThemeHook = (toggleTheme) => {
	const handleTheme = useCallback(() => {
		toggleTheme()
	}, [toggleTheme])
	return { handleTheme }
}
