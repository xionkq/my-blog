function NavItem({ text }: { text: string }) {
  return (
    <div className="p-2 mr-3.5">{text}</div>
  )
}

export default function Nav() {
  const nav = [
    {
      name: 'Blog',
    },
    {
      name: 'Projects',
    },
    {
      name: 'About',
    },
    {
      name: 'Newsletter',
    },
  ]
  return (
    <div className="flex items-center">
      {
        nav.map((item, index) => {
          return <NavItem text={item.name} key={index} />
        })
      }
    </div>
  )
}
