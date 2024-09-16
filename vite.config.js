import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/

export default defineConfig({
	server: {
		//hot: false, // Desactiva HMR
		//h
		watch: {
			// Puedes ajustar estas configuraciones según sea necesario.
			usePolling: true, // Habilita el sondeo de archivos, útil en algunos entornos.

			//clearScreen: false,
			//silent: false,
		},
	},

	plugins: [
		react({
			include: ["src/**/*.{vue,js,ts,jsx,tsx}"], // Monitorear solo archivos en la carpeta src
			exclude: ["node_modules"], // Excluir la carpeta node_modules
		}),
	],
});
