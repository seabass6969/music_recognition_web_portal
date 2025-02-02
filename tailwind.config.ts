import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            animation: {
                'inflating': "inflating 2s ease-in-out alternate infinite",
                'inflating-sm': "inflating_sm 2s ease-in-out alternate infinite",
                'inflating-lg': "inflating_lg 2s ease-in-out alternate infinite",
            },
            keyframes: {
                inflating: {
                    "from": {
                        transform: "scale(1)",
                    },
                    "to": {
                        transform: "scale(2)",
                    },
                },
                inflating_sm: {
                    "from": {
                        transform: "scale(1)",
                    },
                    "to": {
                        transform: "scale(1.5)",
                    },
                },
                inflating_lg: {
                    "from": {
                        transform: "scale(1)",
                    },
                    "to": {
                        transform: "scale(3)",
                    },
                },
            },
        }
    },

	plugins: [typography]
} satisfies Config;
