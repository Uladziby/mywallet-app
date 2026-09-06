/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: [
		'./src/app/_layout.tsx',
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/app/**/*.{js,jsx,ts,tsx}'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				/* 	'dark-grey': '#11181C',
				'light-text': '#ECEDEE',
				'dark-primary': '#ECEDEE',
				primary: '#6C38CC',
				primaryBg: '#1E1F29',
				secondary: '#9CA3AF',
				primaryText: '#ECEDEE',
				secondaryText: '#D2BCFF' */
				primary: '#d2bcff',
				'primary-fixed': '#eaddff',
				'primary-fixed-dim': '#d2bcff',
				'primary-container': '#6c38cc',
				'on-primary': '#3e008f',
				'on-primary-fixed': '#25005a',
				'on-primary-fixed-variant': '#571bb7',
				'on-primary-container': '#ddcaff',
				secondary: '#d3bbff',
				'secondary-fixed': '#ebdcff',
				'secondary-fixed-dim': '#d3bbff',
				'secondary-container': '#5a27ac',
				'on-secondary': '#40008c',
				'on-secondary-fixed': '#260059',
				'on-secondary-fixed-variant': '#5824aa',
				'on-secondary-container': '#c7aaff',
				tertiary: '#ffb3ae',
				'tertiary-fixed': '#ffdad7',
				'tertiary-fixed-dim': '#ffb3ae',
				'tertiary-container': '#b51220',
				'on-tertiary': '#68000b',
				'on-tertiary-fixed': '#410004',
				'on-tertiary-fixed-variant': '#930014',
				'on-tertiary-container': '#ffc5c0',
				error: '#ffb4ab',
				'error-container': '#93000a',
				'on-error': '#690005',
				'on-error-container': '#ffdad6',
				background: '#12131c',
				'on-background': '#e2e1ef',
				surface: '#12131c',
				'surface-dim': '#12131c',
				'surface-bright': '#383843',
				'surface-tint': '#d2bcff',
				'surface-variant': '#33343f',
				'surface-container': '#1e1f29',
				'surface-container-lowest': '#0c0e17',
				'surface-container-low': '#1a1b25',
				'surface-container-high': '#282934',
				'surface-container-highest': '#33343f',
				'on-surface': '#e2e1ef',
				'on-surface-variant': '#ccc3d6',
				outline: '#958e9f',
				'outline-variant': '#4a4454',
				'inverse-primary': '#703cd0',
				'inverse-surface': '#e2e1ef',
				'inverse-on-surface': '#2f303a'
			}
		}
	},
	plugins: []
}
