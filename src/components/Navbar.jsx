import {Link} from "react-router-dom";
import "../styles/components/Navbar.css";
import LogoutButton from "./LogoutButton";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthProvider";

export default function Navbar() {
	const {estaAutenticado, rolUsuario} = useContext(AuthContext);
	console.log("rolUsuario:", rolUsuario);
	console.log("Autenticado:", estaAutenticado);
	return (
		<header>
			<nav className="navbar">
				<Link to="/" className="navbar-link">
					TecnoGo
				</Link>

				<Link to="/smartphones" className="navbar-link">
					Celulares
				</Link>
				<Link to="/computers" className="navbar-link">
					Computadoras
				</Link>
				{!estaAutenticado && (
					<>
						<Link to="/login" className="navbar-link">
							Iniciar sesión
						</Link>
						<Link to="/register" className="navbar-link">
							registro
						</Link>
					</>
				)}

				{estaAutenticado && (
					<div className="Link-edit-products">
						{rolUsuario === "administrador" && (
							<>
								<Link to="/create/products" className="navbar-link">
									<button>Crear Producto</button>
								</Link>
								<Link to="/edit/products" className="navbar-link">
									<button>Editar Productos</button>
								</Link>
							</>
						)}
						<LogoutButton />
						<Link to="/profile/usuario/:id" className="navbar-link">
							Perfil
						</Link>
					</div>
				)}
			</nav>
		</header>
	);
}
