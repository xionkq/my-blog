import Nav from "@/app/ui/nav";

export default function Header() {
  return (
    <div className="h-[60px] mt-[30px] flex justify-between items-center text-base">
      <div className="font-semibold">xion’s blog</div>
      <Nav />
    </div>
  )
}
