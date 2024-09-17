import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/pages/home.css";

const AdminComputers = () => {
	const [computers, setComputers] = useState([]);

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchComputers = async () => {
			try {
				const responseComputers = await axios.get("https://tecnobackend2.vercel.app/computadoras");

				const allComputers = [...responseComputers.data];
				setComputers(allComputers);
			} catch (error) {
				console.error("Error al obtener las computadoras:", error);
			}
		};
		fetchComputers();
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`https://tecnobackend2.vercel.app/delete/computadora/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setComputers(computers.filter((computer) => computer.id !== id));
			console.log("computadora eliminado exitosamente");
		} catch (error) {
			console.error("Error al eliminar la computadora:", error);
		}
	};

	const navigate = useNavigate();

	const handleEdit = (id) => {
		navigate(`/update/computer/${id}`);
	};

	return (
		<div className="product-container">
			{computers.map((computer) => (
				<div key={computer.id} className="product-card">
					<h3>
						{computer.marca} {computer.modelo}
					</h3>
					<img src={`/images/${computer.imagen}`} alt={computer.modelo} style={{width: "200px", height: "180px"}} />

					<p>Precio: ${computer.precio}</p>
					<p>{computer.descripcion}</p>
					<button onClick={() => handleDelete(computer.id)}>Eliminar</button>
					<button onClick={() => handleEdit(computer.id)}>Editar</button>
				</div>
			))}
		</div>
	);
};

export default AdminComputers;
