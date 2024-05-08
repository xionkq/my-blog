'use client'

import ModeSwitch from '@/app/ui/header/mode-switch'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function Header() {
  return (
    <div className="h-18 px-5 flex justify-between items-center text-lg/6 md:h-20 xl:h-32 xl:px-8 xl:text-xl/6">
      <div className="font-semibold">xion’s blog</div>
      <Nav />
    </div>
  )
}

const nav = [
  {
    name: 'Blog',
  },
  {
    name: 'Projects',
  },
  {
    name: 'About',
  },
  {
    name: 'Newsletter',
  },
]

function NavItem({ text }: { text: string }) {
  return <div className="p-2">{text}</div>
}

function Nav() {
  const [isDrawerShow, setIsDrawerShow] = useState(false)

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
              <NavItem text={item.name} />
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
              <NavItem text={item.name} />
            </div>
          )
        })}
        <ModeSwitch />
      </div>
      <Icon className="absolute bottom-5 text-3xl text-black dark:text-white" icon="tdesign:close" onClick={handle} />
    </div>
  )
}
