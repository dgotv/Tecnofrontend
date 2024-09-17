import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/pages/home.css";

const SmartphonesPage = () => {
	const [smartphones, setSmartphones] = useState([]);

	useEffect(() => {
		const fetchSmartphones = async () => {
			try {
				const responseCelulares = await axios.get("https://tecnobackend2.vercel.app/celulares");

				const todosLosCelulares = [...responseCelulares.data];
				setSmartphones(todosLosCelulares);
			} catch (error) {
				console.error("Error al obtener los celulares:", error);
			}
		};
		fetchSmartphones();
	}, []);

	const navigate = useNavigate();

	const handleDetails = (id) => {
		navigate(`/smartphone/${id}`);
	};

	return (
		<div className="product-container">
			{smartphones.map((smartphone) => (
				<div key={smartphone.id} className="product-card">
					<h3>
						{smartphone.marca} {smartphone.modelo}
					</h3>
					<img src={`/images/${smartphone.imagen}`} alt={smartphone.modelo} style={{width: "200px", height: "200px"}} />

					<p>Precio: ${smartphone.precio}</p>
					<p>{smartphone.descripcion}</p>
					<button onClick={() => handleDetails(smartphone.id)}>Características</button>
				</div>
			))}
		</div>
	);
};

export default SmartphonesPage;
