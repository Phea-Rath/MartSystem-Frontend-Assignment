import Header from './Header'
import Dashboard from '../components/Dashboard'
import SideBar from './SideBar';
import { Outlet } from 'react-router';
import { useState } from 'react';
const Main = () => {
    const [isShow, setShow] = useState(true);
    const showSideBar = () => {
        localStorage.setItem('sidebar', !isShow);
        console.log('main');


        setShow(!isShow);
    }
    return (
        <section className='font-display flex'>
            <div className={`${isShow ? 'md:w-[250px]' : 'md:w-[0px]'}  transition-all duration-200`}>
                <SideBar isShow={isShow} onChange={showSideBar} />
            </div>
            <article className='bg-sky-50 flex-1'>
                <Header onChange={showSideBar} className="bg-white shadow-md" />
                <main className='h-[calc(100vh-64px)]'>
                    <section className='h-full scroll-smooth overflow-auto bg-gray-200 dark:bg-gray-900'>
                        {/* <Dashboard /> */}
                        <Outlet />
                    </section>
                </main>
            </article>
        </section>
    )
}

export default Main;