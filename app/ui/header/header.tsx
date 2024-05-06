'use client'

import ModeSwitch from '@/app/ui/header/mode-switch'
import { Icon } from '@iconify/react'

export default function Header() {
  return (
    <div className="h-18 px-5 flex justify-between items-center text-lg/6 md:h-20 xl:h-32 xl:px-8 xl:text-xl/6">
      <div className="font-semibold">xion’s blog</div>
      <Nav />
    </div>
  )
}

function NavItem({ text }: { text: string }) {
  return <div className="p-2 mr-3.5">{text}</div>
}

function Nav() {
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
  return (
    <>
      <div className="hidden items-center md:flex">
        {nav.map((item, index) => {
          return <NavItem text={item.name} key={index} />
        })}
        <ModeSwitch />
      </div>
      <Icon className="text-3xl dark:text-black md:hidden" icon="tdesign:view-list" />
    </>
  )
}
