import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		fontSize: {
			'2xs': 'var(--text-2xs)',
			xs: 'var(--text-xs)',
			sm: 'var(--text-sm)',
			base: 'var(--text-base)',
			lg: 'var(--text-lg)',
			xl: 'var(--text-xl)',
			'2xl': 'var(--text-2xl)',
			'3xl': 'var(--text-3xl)',
			'4xl': 'var(--text-4xl)',
			full: '8vw',
			'responsive-sm': 'clamp(var(--text-sm), 1.5vw, var(--text-2xl))',
			responsive: 'clamp(var(--text-lg), 1.7vw, 5rem)'
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))'
			},
			height: {
				golden: '61.8dvh'
			},
			maxWidth: {
				golden: '61.8vw'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				lemon: 'Lemon Tuesday',
				dank: 'Dank Mono'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
