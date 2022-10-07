import WhiteLogo from '@/images/CNES_bleu.png'
import BlackLogo from '@/images/CNES_black.jpg'
import { styled } from '@stitches/react'

const SImg = styled('img', {
	height: '100%',
})

export const Logo = ({ colorTheme }) => {
	return colorTheme === 'dark' ? (
		<SImg src={WhiteLogo} alt="logo" />
	) : (
		<SImg src={BlackLogo} alt="logo" />
	)
}
