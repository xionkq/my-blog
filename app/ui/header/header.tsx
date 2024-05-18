'use client'

import ModeSwitch from '@/app/ui/header/mode-switch'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  return (
    <div className="h-18 px-5 mb-4 flex justify-between items-center text-lg/6 md:h-20 lg:h-32 lg:px-8 lg:text-xl/6">
      <div className="font-semibold">xion’s blog</div>
      <Nav />
    </div>
  )
}

const nav = [
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'News',
    href: '/news',
  },
]

function NavItem({ pathname, text, href }: { pathname: string; text: string; href: string }) {
  const isActive = pathname === href

  // TODO: remove layout effects
  return (
    <div className={`text-center p-2 border-b-2 ${isActive ? 'font-bold border-black' : 'border-transparent'}`}>
      <Link className={``} href={href}>
        {text}
      </Link>
    </div>
  )
}

function Nav() {
  const [isDrawerShow, setIsDrawerShow] = useState(false)
  const pathname = usePathname()

  const handleClick = () => {
    if (isDrawerShow) {
      const bodyElement = document.body
      bodyElement.style.overflow = 'visible'
    } else {
      const bodyElement = document.body
      bodyElement.style.overflow = 'hidden'
    }
    setIsDrawerShow(!isDrawerShow)
  }
  return (
    <>
      <div className="hidden items-center md:flex">
        {nav.map((item, index) => {
          return (
            <div className="mr-3.5" key={index}>
              <NavItem pathname={pathname} text={item.name} href={item.href} />
            </div>
          )
        })}
        <ModeSwitch />
      </div>
      <Icon className="text-3xl text-black dark:text-white md:hidden" icon="tdesign:view-list" onClick={handleClick} />
      <Drawer isShow={isDrawerShow} handle={handleClick} />
    </>
  )
}

// TODO: use animation
function Drawer({ isShow, handle }: { isShow: boolean; handle: () => void }) {
  const pathname = usePathname()
  const show = isShow ? '' : 'hidden'

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-2xl bg-white/75 dark:bg-black/75 ${show}`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-14 font-semibold">xion’s blog</div>
        {nav.map((item, index) => {
          return (
            <div className="mb-5" key={index}>
              <NavItem pathname={pathname} text={item.name} href={item.href} />
            </div>
          )
        })}
        <ModeSwitch />
      </div>
      <Icon className="absolute bottom-5 text-3xl text-black dark:text-white" icon="tdesign:close" onClick={handle} />
    </div>
  )
}
