import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/pages/home.css";

const ComputersPage = () => {
	const [computers, setComputers] = useState([]);

	useEffect(() => {
		const fetchComputers = async () => {
			try {
				const responseComputadoras = await axios.get("https://tecnobackend2.vercel.app/computadoras");

				const todasLasComputadoras = [...responseComputadoras.data];
				setComputers(todasLasComputadoras);
			} catch (error) {
				console.error("Error al obtener los celulares:", error);
			}
		};
		fetchComputers();
	}, []);

	const navigate = useNavigate();

	const handleDetails = (id) => {
		navigate(`/computer/${id}`);
	};

	return (
		<div className="product-container">
			{computers.map((computer) => (
				<div key={computer.id} className="product-card">
					<h3>
						{computer.marca} {computer.modelo}
					</h3>
					<img src={`/images/${computer.imagen}`} alt={computer.modelo} />

					<p>Precio: ${computer.precio}</p>
					<p>{computer.descripcion}</p>
					<button onClick={() => handleDetails(computer.id)}>Características</button>
				</div>
			))}
		</div>
	);
};

export default ComputersPage;
