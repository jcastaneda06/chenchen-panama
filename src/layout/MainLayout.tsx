import { Outlet, useLocation } from 'react-router'
import Navbar from '../components/Navbar'

const pageNames: { route: string; title: string }[] = [
  { route: '/', title: '' },
  { route: '/planilla-asamblea', title: 'Planilla Asamblea' },
  { route: '/calculo-jubilacion', title: 'Cálculo de Jubilación Ley 462' },
  { route: '/documentos', title: 'Documentos' },
  { route: '/sugerencias', title: 'Sugerencias' },
]

const MainLayout = () => {
  const pathname = useLocation().pathname
  const currentPage = pageNames.find((p) => p.route === pathname)
  return (
    <main className='flex flex-col justify-between h-full'>
      <section className='flex-1'>
        <Navbar routes={pageNames} />
        <article className='mx-4 sm:mx-16 md:mx-24 lg:mx-64 pt-4'>
          <h1 className='text-2xl font-bold'>
            {pathname === '/'
              ? ''
              : !currentPage
                ? 'Go to MainLayout.tsx to set page name'
                : currentPage?.title}
          </h1>
          {pathname !== '/' && (
            <span className='block border-b border-b-gray-300 w-full h-[1px] mb-4' />
          )}
          <Outlet />
        </article>
      </section>
      <footer className='bg-gray-200 p-4 text-gray-500 text-center text-sm'>
        <p>
          © {new Date().getFullYear()} ChenChen Panamá. Código abierto bajo
          licencia{' '}
          <a
            className='hover:text-gray-700 underline'
            href='https://opensource.org/licenses/MIT'
            target='_blank'
            rel='noopener noreferrer'
          >
            MIT
          </a>
          . Contribuye en{' '}
          <a
            className='hover:text-gray-700 underline'
            href='https://github.com/jcastaneda06/chenchen-panama'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </main>
  )
}

MainLayout.displayName = 'MainLayout'

export default MainLayout
