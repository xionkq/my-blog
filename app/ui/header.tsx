import Nav from '@/app/ui/nav'

export default function Header() {
  return (
    <div className="h-[90px] pt-[30px] flex justify-between items-center text-xl/6">
      <div className="font-semibold">xion’s blog</div>
      <Nav />
    </div>
  )
}
