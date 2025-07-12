/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep blue (primary) - blue-800
        'primary-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-600': '#2563EB', // Medium-dark blue (600-level shade) - blue-600
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate gray (secondary) - slate-500
        'secondary-100': '#F1F5F9', // Light slate gray (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light-medium slate gray (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Medium-light slate gray (300-level shade) - slate-300
        'secondary-400': '#94A3B8', // Medium slate gray (400-level shade) - slate-400
        'secondary-600': '#475569', // Medium-dark slate gray (600-level shade) - slate-600
        'secondary-700': '#334155', // Dark slate gray (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Very dark slate gray (800-level shade) - slate-800
        'secondary-900': '#0F172A', // Near-black slate gray (900-level shade) - slate-900
        
        // Accent Colors
        'accent': '#3B82F6', // Bright blue for interactive elements (accent) - blue-500
        'accent-50': '#EFF6FF', // Very light accent blue (50-level shade) - blue-50
        'accent-100': '#DBEAFE', // Light accent blue (100-level shade) - blue-100
        'accent-600': '#2563EB', // Medium-dark accent blue (600-level shade) - blue-600
        'accent-700': '#1D4ED8', // Dark accent blue (700-level shade) - blue-700
        
        // Background Colors
        'background': '#FAFAFA', // Warm off-white background - gray-50
        'surface': '#FFFFFF', // Pure white for data cards and panels - white
        'surface-hover': '#F8FAFC', // Light hover state for surfaces - slate-50
        
        // Text Colors
        'text-primary': '#0F172A', // Near-black with blue undertone (text primary) - slate-900
        'text-secondary': '#475569', // Medium gray for supporting information (text secondary) - slate-600
        'text-muted': '#64748B', // Muted text color - slate-500
        'text-disabled': '#94A3B8', // Disabled text color - slate-400
        
        // Status Colors
        'success': '#059669', // Professional green for positive indicators (success) - emerald-600
        'success-50': '#ECFDF5', // Very light success green (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light success green (100-level shade) - emerald-100
        'success-500': '#10B981', // Medium success green (500-level shade) - emerald-500
        'success-700': '#047857', // Dark success green (700-level shade) - emerald-700
        
        'warning': '#D97706', // Amber orange for cautionary states (warning) - amber-600
        'warning-50': '#FFFBEB', // Very light warning amber (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light warning amber (100-level shade) - amber-100
        'warning-500': '#F59E0B', // Medium warning amber (500-level shade) - amber-500
        'warning-700': '#B45309', // Dark warning amber (700-level shade) - amber-700
        
        'error': '#DC2626', // Classic financial red for losses (error) - red-600
        'error-50': '#FEF2F2', // Very light error red (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light error red (100-level shade) - red-100
        'error-500': '#EF4444', // Medium error red (500-level shade) - red-500
        'error-700': '#B91C1C', // Dark error red (700-level shade) - red-700
        
        // Border Colors
        'border': 'rgba(148, 163, 184, 0.2)', // Subtle border color - slate-400 with opacity
        'border-light': 'rgba(148, 163, 184, 0.1)', // Very subtle border color - slate-400 with low opacity
        'border-medium': 'rgba(148, 163, 184, 0.3)', // Medium border color - slate-400 with medium opacity
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      width: {
        '240': '240px',
        '280': '280px',
      },
      height: {
        '64': '64px',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'financial': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'financial-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      scale: {
        '102': '1.02',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}