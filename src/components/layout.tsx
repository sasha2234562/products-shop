import {Link, Outlet} from "react-router";
import basket from '../assets/basket.svg';

export const Layout = () => {


    return (
        <div className="p-4 flex flex-col gap-6 max-w-[1440px] m-auto">
            <header className='flex justify-between'>
                <nav className='flex justify-between items-center gap-8 w-full'>
                    <Link to={'/'}>
                     <span className='text-2xl'>Каталог</span>
                    </Link>
                    <Link to={'/basket'}>
                        <img src={basket} alt="корзина продуктов" className='w-6'/>
                    </Link>
                </nav>
            </header>
            <Outlet/>
            <footer></footer>
        </div>
    );
};
