'use client'

import Banner from '@/app/ui/banner'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { setTilt } from '@/app/hook/useTilt'

export default function About() {
  return (
    <>
      <Banner text={'THE ABOUT'} />
      <Anime />
    </>
  )
}

function Anime() {
  return (
    <div className="mt-16 mb-8 px-8">
      <h2 className="text-2xl font-semibold">Favorite anime</h2>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-12">
        {new Array(1).fill(0).map((v, i) => {
          return <AnimeCard key={i} />
        })}
      </div>
    </div>
  )
}

function AnimeCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    setTilt(imgRef.current)
  })
  return (
    <div ref={cardRef} className="w-[135px]">
      <Image ref={imgRef} src="/anime/wei-mei-hao-shi-jie-xian-shang-zhu-fu.jpg" width="135" height="190" alt="" />
      {/*<div ref={imgRef} className="w-[135px] h-[192px] bg-amber-300 relative" />*/}
      <div className="text-sm py-2 text-center">为美好世界献上祝福</div>
    </div>
  )
}
