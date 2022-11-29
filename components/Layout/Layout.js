import Link from "next/link"

export default function Layout({ children, visningssted }) {
    return (
    <>
    {visningssted ? (
        <div className='w-full'>
          <div className='h-20 p-4 bg-black'>
            <Link href="/">
            <img src="https://reklameservice.no/wp-content/uploads/2021/08/LOG.webp" height='40px' width='320px' className="my-auto" />
            </Link>      
            <Link href="/">
            <button className="h-10 px-6 font-semibold rounded-md bg-white right-4 top-4 absolute">
              Tilbake
            </button>
          </Link>
          </div>
          {children}
        </div>
    ) : (
        <div className='w-full'>
          <div className='h-20 p-4 bg-black'>
            <img src="https://reklameservice.no/wp-content/uploads/2021/08/LOG.webp" height='40px' width='320px' className="my-auto" />            
          </div>
          {children}
        </div>
    )}
    </>
    )
  }
