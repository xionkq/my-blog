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
    <footer className="flex flex-col-reverse items-center min-h-20 text-lg/6 px-8 lg:text-xl/6 md:flex-row">
      <span className="mt-7 mb-6 md:m-0">© 2024</span>
      <div className="flex flex-col md:flex-row items-center">
        {links.map((item) => {
          return (
            <span className="md:ml-3.5 my-1.5" key={item.name}>
              {item.name}
            </span>
          )
        })}
      </div>
    </footer>
  )
}
