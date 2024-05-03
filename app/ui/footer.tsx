export default function Footer() {
  const links = [
    {
      name: 'Twitter',
    },
    {
      name: 'LinkedIn',
    },
    {
      name: 'Email',
    },
    {
      name: 'RSS feed',
    },
    {
      name: 'Add to Feedly',
    },
  ]
  return (
    <div className="flex items-center h-20 text-xl/6">
      <span>© 2024</span>
      {
        links.map((item) => {
          return <span className="ml-3.5" key={item.name}>{item.name}</span>
        })
      }
    </div>
  )
}
