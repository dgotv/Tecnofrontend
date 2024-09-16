import {useForm} from "react-hook-form";
import axios from "axios";
import "../styles/components/CreateNewProduct.css";

export default function CreateNewProduct() {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();

	const onSubmit = async (data) => {
		const dataToSend = {
			...data,
			categoria_id: parseInt(data.categoria_id),
		};
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				"http://localhost:3000/crear/producto",
				{
					categoria_id: dataToSend.categoria_id,
					marca: data.marca,
					modelo: data.modelo,
					precio: data.precio,
					descripcion: data.descripcion,
					imagen: data.imagen,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Producto creado:", response.data);
			if (response.status === 201) {
				alert("¡Producto creado exitosamente!");
			} else {
				alert("Error al crear el producto. Por favor, inténtalo de nuevo.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Ocurrió un error inesperado. Por favor, contacta al administrador.");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="create-product__form">
				<p>Creación de producto</p>
				<select type="number" {...register("categoria_id", {required: true})}>
					<option value={1}>Celulares</option>
					<option value={2}>Computadoras</option>
				</select>
				{errors.categoria_id && <span>{errors.categoria_id.message}</span>}

				<label htmlFor="marca">Marca:</label>
				<select type="text" {...register("marca", {required: "Requiere Marca"})}>
					<option value="XIAOMI">XIAOMI</option>
					<option value="SAMSUNG">SAMSUNG</option>
					<option value="MOTOROLA">MOTOROLA</option>
					<option value="TECNO">TECNO</option>
					<option value="HONOR">HONOR</option>
					<option value="OPPO">OPPO</option>
					<option value="HP">HP</option>
					<option value="ASUS">ASUS</option>
					<option value="ACER">ACER</option>
					<option value="MSI">MSI</option>
				</select>

				{errors.marca && <span>{errors.marca.message}</span>}
				<label htmlFor="modelo">Modelo:</label>
				<input type="text" {...register("modelo", {required: "Requiere Modelo"})} />
				{errors.modelo && <span>{errors.modelo.message}</span>}
				<label htmlFor="precio">Precio:</label>
				<input type="number" {...register("precio", {required: "Requiere Precio"})} />
				{errors.precio && <span>{errors.precio.message}</span>}
				<label htmlFor="descripcion">Descripción:</label>
				<textarea
					type="text"
					{...register("descripcion", {
						required: "Requiere Descripción",
					})}
				/>
				{errors.descripcion && <span>{errors.descripcion.message}</span>}

				<label htmlFor="imagen">Imagen</label>
				<select type="text" {...register("imagen", {required: "Requiere imagen"})}>
					<option value="imgASUS.jpg">ASUS</option>
					<option value="imgHP.png">HP</option>
					<option value="imgMSI.png">MSI</option>
					<option value="imgMOTOROLA.png">MOTOROLA</option>
					<option value="imgSAMSUNG.jpg">SAMSUNG</option>
					<option value="imgXIAOMI.png">XIAOMI</option>
				</select>

				{errors.imagen && <span>{errors.imagen.message}</span>}
				<button type="submit">Crear Producto</button>
			</form>
		</div>
	);
}
