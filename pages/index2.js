import Link from 'next/link'

const Index = ({ posts }) => (
  <div>
    <h1>Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href="/[id]" as={`/${post.id}`}>
            {post.title.rendered}
          </Link>
        </li>
      ))}
    </ul>
    <ul>
      {posts.flatMap((post) =>
        post.acf.flater.map((flater) => (
          <li key={flater.id}>
            <Link href="/sandkasse/[plassnr]" as={`/sandkasse/${flater.plassnr}`}>
              {flater.plassnr}
            </Link>
          </li>
        ))
      )}
    </ul>
  </div>
)

export async function getStaticProps() {
  const res = await fetch('https://reklameservice.no/wp-json/wp/v2/visningssteder/')
  const posts = await res.json()

  return { props: { posts } }
}

export default Index