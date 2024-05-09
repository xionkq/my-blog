export default function Banner({ text }: { text: string }) {
  return (
    <div className="border-y border-black/[.34] h-24 text-banner font-bold flex items-center justify-center dark:border-white lg:h-72 md:h-48">
      {text}
    </div>
  )
}
