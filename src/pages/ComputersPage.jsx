import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/home.css";

const ComputersPage = () => {
	const [computers, setComputers] = useState([]);

	useEffect(() => {
		const fetchComputers = async () => {
			try {
				const responseComputadoras = await axios.get("http://localhost:3000/computadoras");

				const todasLasComputadoras = [...responseComputadoras.data];
				setComputers(todasLasComputadoras);
			} catch (error) {
				console.error("Error al obtener los celulares:", error);
			}
		};
		fetchComputers();
	}, []);

	return (
		<div className="product-container">
			{computers.map((computer) => (
				<div key={computer.id} className="product-card">
					<h3>
						{computer.marca} {computer.modelo}
					</h3>
					<img src={`/src/assets/img/${computer.imagen}`} alt={computer.modelo} />

					<p>Precio: ${computer.precio}</p>
					<p>{computer.descripcion}</p>
					<button>Ver más</button>
				</div>
			))}
		</div>
	);
};

export default ComputersPage;
