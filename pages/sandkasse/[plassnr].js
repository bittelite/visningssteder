import { useRouter } from 'next/router'

const Post = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{post.title.rendered || ''}</h1>
      {post.acf.flater.map((flater) => (
        <div key={flater.id}>
          <h2>{flater.type}</h2>
          <p>{flater.format}</p>
          <p>{flater.plassering}</p>
          <p>{flater.plassnr}</p>
          <img src={flater.hovedbilde} alt={flater.type} />
          <p>{flater.fritekst}</p>
        </div>
      ))}
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://reklameservice.no/wp-json/wp/v2/visningssteder/')
  const posts = await res.json()

  const paths = posts.flatMap((post) =>
    post.acf.flater.map((flater) => ({
      params: { plassnr: flater.plassnr.toString() },
    }))
  )

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://reklameservice.no/wp-json/wp/v2/visningssteder/${params.plassnr}`)
  const post = await res.json()

  return { props: { post } }
}

export default Post