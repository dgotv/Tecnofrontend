import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import "../styles/pages/UpdateProduct.css";

function UpdateComputer() {
	const {id} = useParams();
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm();

	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState(null);
	// Función para obtener el token de localStorage
	const token = localStorage.getItem("token");
	console.log("Token para actualizar computer", token);

	useEffect(() => {
		const fetchComputer = async () => {
			setCargando(true);
			try {
				const respuesta = await axios.get(`http://localhost:3000/computadoras/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const computerData = respuesta.data[0];

				reset(computerData);
			} catch (error) {
				setError(error);
			} finally {
				setCargando(false);
			}
		};
		fetchComputer();
	}, [id, reset, token]);

	const onSubmit = async (data) => {
		try {
			await axios.put(`http://localhost:3000/update/computadora/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			alert("Computadora actualizada exitosamente");
		} catch (error) {
			console.error("Error al actualizar la computadora:", error);
		}
	};

	if (cargando) {
		return <p>Cargando computador...</p>;
	}
	if (error) {
		return <p>Error al cargar la computadora: {error.message}</p>;
	}

	return (
		<div>
			<h2>Editar Computadora</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="update-product__form">
				<div>
					<label>Marca:</label>
					<select type="text" {...register("marca", {required: "Requiere Marca"})}>
						<option value="HP">HP</option>
						<option value="ASUS">ASUS</option>
						<option value="ACER">ACER</option>
						<option value="MSI">MSI</option>
					</select>
					{errors.marca && <span>La marca es requerida</span>}
				</div>

				<div>
					<label>Modelo:</label>
					<input {...register("modelo", {required: true})} />
					{errors.modelo && <span>El modelo es requerido</span>}
				</div>

				<div>
					<label>Precio:</label>
					<input type="number" {...register("precio", {required: true})} />
					{errors.precio && <span>El precio es requerido</span>}
				</div>

				<div>
					<label>Descripción:</label>
					<textarea {...register("descripcion", {required: true})} />
					{errors.descripcion && <span>La descripción es requerida</span>}
				</div>

				<div>
					<label>Imagen</label>
					<select type="text" {...register("imagen", {required: "Requiere imagen"})}>
						<option value="imgASUS.jpg">ASUS</option>
						<option value="imgHP.png">HP</option>
						<option value="imgMSI.png">MSI</option>
					</select>
				</div>

				<button type="submit">Actualizar</button>
			</form>
		</div>
	);
}

export default UpdateComputer;
