import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthProvider";

const LogoutButton = () => {
	const {estaAutenticado, setEstaAutenticado} = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("rol");
		localStorage.removeItem("userId");
		setEstaAutenticado(false);
		setRolUsuario(null);

		navigate("/");
	};

	return (
		<button onClick={handleLogout} className="button-logout">
			Cerrar sesión
		</button>
	);
};

export default LogoutButton;
