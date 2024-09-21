import Banner from '@/app/ui/banner'
import Image from 'next/image'

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
        {new Array(10).fill(0).map((v) => {
          return <AnimeCard key={v} />
        })}
      </div>
    </div>
  )
}

function AnimeCard() {
  return (
    <div className="w-[135px]">
      <Image src="/anime/wei-mei-hao-shi-jie-xian-shang-zhu-fu.jpg" width="135" height="190" alt="" />
      <div className="text-sm py-2 text-center">为美好世界献上祝福</div>
    </div>
  )
}
