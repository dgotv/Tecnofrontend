import {useNavigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

const verifyTokenAndRole = (allowedRoles) => {
	const token = localStorage.getItem("token");
	console.log("token local storage", localStorage.getItem("token"));
	if (!token) {
		return false;
	}

	try {
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		if (decodedToken.rol !== "administrador") {
			return false;
		}
	} catch (error) {
		console.error("Error decoding token:", error);
		return false;
	}

	return true;
};

const ProtectedRoute = ({allowedRoles}) => {
	const navigate = useNavigate();
	const isAuthenticated = verifyTokenAndRole(allowedRoles);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
