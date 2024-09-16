import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/pages/home.css";

const AdminCelulares = () => {
	const [smartphones, setSmartphones] = useState([]);

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchSmartphones = async () => {
			try {
				const responseCelulares = await axios.get("http://localhost:3000/celulares");

				const todosLosCelulares = [...responseCelulares.data];
				setSmartphones(todosLosCelulares);
			} catch (error) {
				console.error("Error al obtener los celulares:", error);
			}
		};
		fetchSmartphones();
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/delete/celular/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setSmartphones(smartphones.filter((smartphone) => smartphone.id !== id));
			console.log("Celular eliminado exitosamente");
		} catch (error) {
			console.error("Error al eliminar el celular:", error);
		}
	};

	const navigate = useNavigate();

	const handleEdit = (id) => {
		navigate(`/update/smartphone/${id}`);
	};

	return (
		<div className="product-container">
			<div className="card-admin">
				<h2>Administrador</h2>
			</div>

			{smartphones.map((smartphone) => (
				<div key={smartphone.id} className="product-card">
					<h3>
						{smartphone.marca} {smartphone.modelo}
					</h3>
					<img src={`/src/assets/img/${smartphone.imagen}`} alt={smartphone.modelo} style={{width: "200px", height: "auto"}} />

					<p>Precio: ${smartphone.precio}</p>
					<p>{smartphone.descripcion}</p>
					<button>Ver más</button>
					<button onClick={() => handleDelete(smartphone.id)}>Eliminar</button>
					<button onClick={() => handleEdit(smartphone.id)}>Editar</button>
				</div>
			))}
		</div>
	);
};

export default AdminCelulares;
