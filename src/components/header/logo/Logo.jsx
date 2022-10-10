import WhiteLogo from '@/images/CNES_bleu.png'
import BlackLogo from '@/images/CNES_black.jpg'
import MTELogo from '@/images/min_transtion_ecologique_rvb_0.webp'
import IGEDDLogo from '@/images/IGEDD.png'
import { styled } from '@stitches/react'
const LogoContainer = styled('div', {
	display: 'flex',
	height: '100%',
})
const SImg = styled('img', {
	height: '100%',
	marginRight: '1rem',
})

export const Logo = ({ colorTheme }) => {
	return colorTheme === 'dark' ? (
		<LogoContainer>
			<SImg src={WhiteLogo} alt="logo" />
			<SImg src={MTELogo} alt="logo" />
			<SImg src={IGEDDLogo} alt="logo" />
		</LogoContainer>
	) : (
		<LogoContainer>
			<SImg src={BlackLogo} alt="logo" />
			<SImg src={MTELogo} alt="logo" />
			<SImg src={IGEDDLogo} alt="logo" />
		</LogoContainer>
	)
}
