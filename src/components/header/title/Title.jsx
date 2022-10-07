import { styled, theme } from '@/stitches.config'
const H1 = styled('h1', {
	color: '$text',
	fontSize: '2.5rem',
	fontFamily: 'montserrat',
	textTransform: 'uppercase',
	letterSpacing: '.3rem',
})

export const Title = () => {
	return <H1>Inventaire national des plans d’eau</H1>
}
