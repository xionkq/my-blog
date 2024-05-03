export enum BlogLabel {
  LEADERSHIP = 'Leadership',
  MANAGEMENT = 'Management',
}

export const BlogLabelColor = {
  [BlogLabel.LEADERSHIP]: '#6941C6',
  [BlogLabel.MANAGEMENT]: '#363F72',
}

export function getLabelColorClass(label: BlogLabel): string {
  return `text-[${BlogLabelColor[label]}]`
}

export function getLabelBgClass(label: BlogLabel): string {
  return `bg-[${BlogLabelColor[label]}]/[.10]`
}

export function getAllLabelClass() {
  const colorClass = Object.values(BlogLabelColor).map((color) => {
    return `text-[${color}]`
  })
  const bgClass = Object.values(BlogLabelColor).map((color) => {
    return `bg-[${color}]/[.10]`
  })
  return [...colorClass, ...bgClass]
}
