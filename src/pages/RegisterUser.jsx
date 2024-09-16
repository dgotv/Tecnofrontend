import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/pages/register.css";

export default function RegisterUser() {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("https://tecnobackend2.vercel.app/registro/usuario", {
				nombre: data.nombre,
				correo: data.correo,
				clave: data.clave,
			});
			console.log("Usuario creado:", response.data);
			if (response.status === 201) {
				alert("¡Usiario creado exitosamente!");
				navigate("/login");
			} else {
				alert("Error al crear el usuario. Por favor, inténtalo de nuevo.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Ocurrió un error inesperado. Por favor, contacta al administrador.");
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="create-user__form">
				<p>Creación de Usuario</p>
				<label htmlFor="nombre">Nombre:</label>
				<input type="text" {...register("nombre", {required: "Requiere un nombre"})} />
				{errors.nombre && <span> {errors.nombre.message}</span>}

				<label htmlFor="correo">Correo:</label>
				<input
					type="text"
					id="email"
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
					{...register("clave", {
						required: "La contraseña es obligatoria",
						minLength: {
							value: 6,
							message: "La contraseña debe tener al menos 6 caracteres",
						},
					})}
				/>
				{errors.clave && <span>{errors.clave.message}</span>}

				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
}
