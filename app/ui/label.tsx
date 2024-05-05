import { BlogLabel, getLabelBgClass, getLabelColorClass } from '@/app/lib/label'

export default function Label({ label }: { label: BlogLabel }) {
  const color = getLabelColorClass(label)
  const bg = getLabelBgClass(label)
  return (
    <div className="h-6 rounded-full inline-flex items-center font-medium mr-2 bg-white">
      <div className={` px-2.5 rounded-full ${color} ${bg}`}>{label}</div>
    </div>
  )
}
