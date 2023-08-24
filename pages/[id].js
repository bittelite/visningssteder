import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

const Post = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{post.title.rendered || ''}</h1>
      <p>{post.content.rendered || ''}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://reklameservice.no/wp-json/wp/v2/visningssteder/')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://reklameservice.no/wp-json/wp/v2/visningssteder/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}

export default Post