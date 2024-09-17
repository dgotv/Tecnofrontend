import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ComputersDetails = () => {
	const {id} = useParams();
	const [computers, setComputer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchComputer = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`https://tecnobackend2.vercel.app/computadoras/${id}`);
				setComputer(response.data);
			} catch (error) {
				setError("Error fetching product details");
				console.error("Error fetching product details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchComputer();
	}, [id]);

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="product-container">
			{computers.map((computer) => (
				<div key={computer.id} className="product-card">
					<h3>
						{computer.marca} {computer.modelo}
					</h3>
					<img src={`/images/${computer.imagen}`} alt={computer.modelo} style={{width: "200px", height: "200px"}} />

					<p>Precio: ${computer.precio}</p>
					<p>{computer.descripcion}</p>
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

export default ComputersDetails;
