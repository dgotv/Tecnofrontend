import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ComputersPage from "./pages/ComputersPage";
import SmartphonesPage from "./pages/SmartphonesPage";
import CreateNewProduct from "./components/CreateNewProduct";
import RegisterUser from "./pages/RegisterUser";
import ProfileUser from "./pages/ProfileUser";
import LoginPage from "./pages/LoginPage";
import AdminCelulares from "./pages/AdminCelulares";
import UpdateSmartphone from "./pages/UpdateSmartphone";
import AdminComputers from "./pages/AdminComputers";
import UpdateComputer from "./pages/UpdateComputer";
import SmartphoneDetails from "./components/SmartphoneDetails";
import ComputersDetails from "./components/ComputersDetails";
import Footer from "./components/Footer";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<>
							{<SmartphonesPage />}
							{<ComputersPage />}
						</>
					}
				/>

				<Route path="/computer/:id" element={<ComputersDetails />} />
				<Route path="/smartphone/:id" element={<SmartphoneDetails />} />
				<Route path="/computers" element={<ComputersPage />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile/usuario/:id" element={<ProfileUser />} />
				<Route path="/smartphones" element={<SmartphonesPage />} />

				<Route element={<ProtectedRoute allowedRoles={["administrador"]} />}>
					<Route path="/create/products" element={<CreateNewProduct />} />
					<Route path="/update/computer/:id" element={<UpdateComputer />} />
					<Route path="/update/smartphone/:id" element={<UpdateSmartphone />} />
					<Route
						path="/edit/products"
						element={
							<>
								<AdminCelulares />
								<AdminComputers />
							</>
						}
					/>
				</Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
