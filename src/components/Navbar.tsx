import { FC, PropsWithChildren, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Drawer, Flex } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
type LinksListProps = {
  isMobile?: boolean
  onAfterNavigate?: () => void
  links: {
    route: string
    title: string
  }[]
}

const LinksList: FC<PropsWithChildren<LinksListProps>> = (props) => {
  const { isMobile, onAfterNavigate, links } = props
  const navigate = useNavigate()
  const pathname = window.location.pathname

  return (
    <>
      {links.map(
        (link) =>
          link.route !== '/' && (
            <>
              <li>
                <button
                  className={`link-button h-full p-4 w-full
            ${
              pathname === link.route ? 'border-b-blue-500' : 'border-b-white'
            }`}
                  onClick={() => {
                    navigate(link.route)
                    if (onAfterNavigate) onAfterNavigate()
                  }}
                >
                  {link.title}
                </button>
              </li>
              {isMobile && <span className='border-b border-gray-300' />}
            </>
          ),
      )}
    </>
  )
}

type NavbarProps = {
  routes: { route: string; title: string }[]
}
const Navbar: FC<NavbarProps> = (props) => {
  const { routes } = props
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const navigate = useNavigate()

  return (
    <>
      <Flex
        component={'nav'}
        justify='space-between'
        align='items-center'
        className='sticky top-0 bg-blue-950 text-blue-50 shadow-md px-8 z-50'
      >
        <button
          className='text-xl m-0 p-4 cursor-pointer'
          onClick={() => navigate('/')}
        >
          Chen Chen
        </button>

        <button
          ref={buttonRef}
          className='p-4 md:hidden'
          onClick={() => setShowSidebar(true)}
        >
          <MenuOutlined />
        </button>
        <ul className='hidden md:flex gap-4 '>
          <LinksList links={routes} />
        </ul>
      </Flex>
      <Drawer
        open={showSidebar}
        placement='right'
        onClose={() => setShowSidebar(false)}
      >
        <ul className='flex flex-col relative'>
          <LinksList
            links={routes}
            isMobile
            onAfterNavigate={() => setShowSidebar(false)}
          />
        </ul>
      </Drawer>
    </>
  )
}

Navbar.displayName = 'Navbar'

export default Navbar
