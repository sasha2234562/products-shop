import {Link, Outlet} from "react-router";

export const Layout = () => {
    return (
        <div className="p-4 flex flex-col gap-6 max-w-[1440px] m-auto">
            <header className='flex justify-between'>
                <p>Магазин ваших товаров</p>
                <nav>
                    <Link to={'/'}>
                     <span>На главную</span>
                    </Link>
                </nav>
            </header>
            <Outlet/>
            <footer></footer>
        </div>
    );
};
