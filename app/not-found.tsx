import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center pt-40">
      <Image src="/404.png" width="800" height="400" alt="404 not found" />
    </div>
  )
}
