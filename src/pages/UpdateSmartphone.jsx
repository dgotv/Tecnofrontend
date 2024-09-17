import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import "../styles/pages/UpdateProduct.css";

function UpdateSmartphone() {
	const {id} = useParams();
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm();

	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState(null);

	const token = localStorage.getItem("token");
	useEffect(() => {
		const obtenerCelular = async () => {
			setCargando(true);
			try {
				const respuesta = await axios.get(`https://tecnobackend2.vercel.app/celulares/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const celularData = respuesta.data[0];
				reset(celularData);
			} catch (error) {
				setError(error);
			} finally {
				setCargando(false);
			}
		};
		obtenerCelular();
	}, [id, reset, token]);

	const onSubmit = async (data) => {
		try {
			await axios.put(`https://tecnobackend2.vercel.app/update/celular/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			alert("Celular actualizado exitosamente");
		} catch (error) {
			console.error("Error al actualizar el celular:", error);
		}
	};

	if (cargando) {
		return <p>Cargando celular...</p>;
	}
	if (error) {
		return <p>Error al cargar el celular: {error.message}</p>;
	}

	return (
		<div>
			<h2>Editar Celular</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="update-product__form">
				<div>
					<label>Marca:</label>
					<select type="text" {...register("marca", {required: "Requiere Marca"})}>
						<option value="XIAOMI">XIAOMI</option>
						<option value="SAMSUNG">SAMSUNG</option>
						<option value="MOTOROLA">MOTOROLA</option>
						<option value="TECNO">TECNO</option>
						<option value="HONOR">HONOR</option>
						<option value="OPPO">OPPO</option>
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
					<label>Imagen:</label>
					<select type="text" {...register("imagen", {required: "Requiere imagen"})}>
						<option value="imgSAMSUNG.jpg">SAMSUNG</option>
						<option value="imgMOTOROLA.png">MOTOROLA</option>
						<option value="imgXIAOMI.png">XIAOMI</option>
					</select>
				</div>

				<button type="submit">Actualizar</button>
			</form>
		</div>
	);
}

export default UpdateSmartphone;
