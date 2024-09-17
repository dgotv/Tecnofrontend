import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const SmartphoneDetails = () => {
	const {id} = useParams();
	const [smartphones, setCelular] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCelular = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`https://tecnobackend2.vercel.app/celulares/${id}`);
				setCelular(response.data);
			} catch (error) {
				setError("Error fetching product details");
				console.error("Error fetching product details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCelular();
	}, [id]);

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>{error}</p>;

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
					<h4>Características técnicas del producto</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repudiandae saepe dolorum praesentium aperiam accusantium amet facere,
						atque suscipit sunt iusto eum animi ducimus nulla aut asperiores aliquam! Fuga, at?
					</p>
				</div>
			))}
		</div>
	);
};

export default SmartphoneDetails;
