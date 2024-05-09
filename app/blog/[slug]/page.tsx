export default function Page({ params }: { params: { slug: string } }) {
  // TODO: show blog posts
  return <h1>{params.slug}</h1>
}
