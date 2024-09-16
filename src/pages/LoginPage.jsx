import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/pages/register.css";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthProvider";

export default function LoginPage() {
	const {estaAutenticado, setEstaAutenticado} = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("http://localhost:3000/login/usuario", {
				correo: data.correo,
				clave: data.clave,
			});

			console.log("Inicio de sesión:", response.data);

			if (response.status === 200) {
				const {accessToken} = response.data;
				const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); // Decodificar token JWT
				localStorage.setItem("token", accessToken);
				localStorage.setItem("userId", decodedToken.id); // Guardar el ID del usuario
				localStorage.setItem("rol", decodedToken.rol);

				setEstaAutenticado(true);

				if (decodedToken.rol === "administrador") {
					navigate("/edit/products");
				} else {
					navigate(`/profile/usuario/${decodedToken.id}`);
				}

				alert("¡inicio de sesión exitoso!");
			} else {
				alert("Error al tratar de logearse. Por favor, inténtalo de nuevo.");
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				alert("Usuario o contraseña incorrecta");
			} else {
				alert("Error al iniciar sesión. Por favor, intenta de nuevo.");
			}
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="create-user__form">
				<p>Iniciar sesión</p>

				<label htmlFor="correo">Correo:</label>
				<input
					type="email"
					id="correo"
					{...register("correo", {
						required: "El correo es obligatorio",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: "Formato de correo no válido",
						},
					})}
				/>
				{errors.correo && <span>{errors.correo.message}</span>}

				<label htmlFor="clave">Contraseña:</label>
				<input
					type="password"
					id="clave"
					{...register("clave", {
						required: "La contraseña es obligatoria",
						minLength: {
							value: 6,
							message: "La contraseña debe tener al menos 6 caracteres",
						},
					})}
				/>
				{errors.clave && <span>{errors.clave.message}</span>}

				<button type="submit">Iniciar Sesión</button>
			</form>
		</div>
	);
}
