import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfileUser() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/perfil/usuario/${userId}`
				);
				setUser(response.data);
			} catch (error) {
				console.error("Error al obtener el perfil:", error);
			}
		};
		fetchUser();
	}, []);

	return (
		<div>
			{user ? (
				<div>
					<h1>Perfil del Usuario</h1>
					<p>Nombre: {user.nombre}</p>
					<p>Correo: {user.correo}</p>
				</div>
			) : (
				<p>Cargando perfil...</p>
			)}
		</div>
	);
}

export default ProfileUser;
