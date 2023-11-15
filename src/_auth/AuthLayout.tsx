import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {

  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (

        <>
          <section className='flex flex-1 justify-center items-center flex-col'>
            {/* Outlet will render the child route that matches the current URL */}
            <Outlet /> 
          </section>
          <img src="/assets/images/side-img.svg"
            alt="logo"
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
        </>
      )}
    </>
  )
}

export default AuthLayout
