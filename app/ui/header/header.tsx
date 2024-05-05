import Nav from '@/app/ui/header/nav'

export default function Header() {
  return (
    <div className="h-24 pt-8 flex justify-between items-center text-xl/6">
      <div className="font-semibold">xion’s blog</div>
      <Nav />
    </div>
  )
}
