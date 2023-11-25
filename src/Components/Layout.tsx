import * as React from 'react';
import { Outlet ,Link } from 'react-router-dom';
const Layout :React.FC = () => {
return (
    <>
    <div className=' flex flex-col mt-6 items-center justify-center'>
    <header >
<Link to='/register' className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline">  Register</Link>
<Link to='/login' className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"> Login</Link>   
    </header>
    <main> 
    <Outlet />
    </main>  
    </div>
    </>
)
}
export default Layout;