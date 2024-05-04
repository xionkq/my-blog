'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'

enum Mode {
  LIGHT,
  DARK,
}

export default function ModeSwitch() {
  const [mode, setMode] = useState<Mode>(Mode.LIGHT)
  const left = mode === Mode.DARK ? 'left-14' : 'left-4'
  const handleClick = () => {
    setMode(mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT)
  }
  return (
    <button
      className="flex items-center px-4 h-10 bg-black rounded-full text-white relative dark:bg-white"
      onClick={handleClick}
    >
      <div className={`rounded-full bg-white h-6 w-6 absolute transition-all ${left} dark:bg-black`}></div>
      <Icon className="text-2xl mr-4 dark:text-black" icon="tdesign:mode-light" />
      <Icon className="text-2xl dark:text-black" icon="tdesign:mode-dark" />
    </button>
  )
}
