import {BrowserRouter, Route, Routes} from 'react-router';
import {Layout} from "./src/components/layout.tsx";
import {Start} from "./src/pages/start.tsx";
import {Product} from "./src/pages/product.tsx";
import {Basket} from "./src/pages/basket.tsx";


export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route element={<Layout/>}>
				<Route path={'/'} element={<Start/>}/>
				<Route path={'/product/:id'} element={<Product/>}/>
				<Route path={'/basket'} element={<Basket/>}/>
			</Route>
		</Routes>
	</BrowserRouter>
);
