export default function Banner({ text }: { text: string }) {
  return (
    <div className="border-y border-black/[.34] h-72 text-banner font-bold flex items-center justify-center dark:border-white">
      {text}
    </div>
  )
}
