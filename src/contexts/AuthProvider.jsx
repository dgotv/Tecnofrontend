import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [estaAutenticado, setEstaAutenticado] = useState(false);
	const [rolUsuario, setRolUsuario] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verificar = async () => {
			const token = localStorage.getItem("token");
			const rol = localStorage.getItem("rol");
			console.log("Token:", token);
			console.log("Rol:", rol);

			if (!token) {
				console.log("Token o rol faltante");
				setEstaAutenticado(false);
				setRolUsuario(null);
			} else {
				setEstaAutenticado(true);
				setRolUsuario(rol);
				console.log("RolUsuario en estado:", rolUsuario);
			}
			setIsLoading(false);
		};

		verificar();
	}, []);
	if (isLoading) {
		return <div>Cargando...</div>;
	}

	return <AuthContext.Provider value={{estaAutenticado, rolUsuario, setEstaAutenticado}}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
