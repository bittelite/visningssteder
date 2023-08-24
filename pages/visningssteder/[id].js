import Link from "next/link";
import Layout from "../../components/Layout/Layout";

function Visningssted({ post, media }) {

  return (
    <>
    <Layout visningssted>
      <div className="container mx-auto max-w-7xl">
        <div className='relative'
        style={{
          backgroundImage: `url(${media._embedded['wp:featuredmedia'][0].source_url})`,
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: 'auto',
          height: '65vh'
        }}>
          <div className='p-4 w-full left-0 bottom-0 absolute bg-gradient-to-t from-black text-white'>
            <p className='float-right -mb-3'>
              <img src={ post.acf.ikon } />
            </p>
            <h1 className='text-5xl font-bold drop-shadow-lg max-w-5xl mx-auto'>
              {post.title.rendered}
            </h1>
          </div>
        </div>
        <div className='p-4 bg-black text-white'>
          <div className="grid grid-rows-2 grid-flow-col md:grid-rows-1 gap-2 max-w-5xl mx-auto ">
            <p className="text-case">Type:<br />
              <span className="font-bold text-2xl">{post.acf.type}</span>
            </p>
            <p className="pb-2 pr-2">Selskap:<br />
              <span className="font-bold text-2xl">{post.acf.selskap}</span>
            </p>
            <p className="pb-2 pr-2">Fylke:<br />
              <span className="font-bold text-2xl">{post.acf.fylke}</span>
            </p>
            <p className="flex-1">Årlig besøk:<br />
              <span className="font-bold text-2xl">{post.acf.besokende}</span>
            </p>
            </div>
        </div>
        <div className='flex px-4 py-10 gap-2 flex-col sm:flex-row'>
          <div className='max-w-5xl mx-auto'>
            <p className='text-2xl font-medium pb-2'>
              {post.acf.beskrivelse.ingress}
            </p>
            <div className="py-6"
              dangerouslySetInnerHTML={{__html: post.acf.beskrivelse.tekst}}>
            </div>
          </div>
        </div>
        <div className="grid justify-center items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5 md:gap-10 md:p-10 lg:p-5 uppercase">
        {post.acf.flater.map(post => (
  <div key={post.plassnr} className="card">

      <div className="">
        <img
          src={post.hovedbilde}
          alt=""
          className="object-cover brightness-50 hover:brightness-100"
        />
      </div>

    <form className="flex-auto p-6">
      <div className="flex flex-wrap">
        <h3 className="flex-auto text-lg font-semibold text-slate-900">
          {post.type}
        </h3>
        <div className="text-lg font-semibold text-slate-500">
          {post.plassnr}
        </div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          Format: {post.format}
        </div>
        <p className="text-sm text-slate-700">
          Plassering: {post.plassering}
        </p>
      </div>
    </form>
  </div>
))}
        </div>
      </div>
      </Layout>
      </>
  );
} 

export async function getStaticPaths() {
  const res = await fetch('https://reklameservice.no/wp-json/wp/v2/visningssteder');
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))
  return {paths, fallback: false};
}

export async function getStaticProps({params}) {
  const res = await fetch(`https://reklameservice.no/wp-json/wp/v2/visningssteder/${params.id}?acf_format=standard`);
  const post = await res.json();
  const res2 = await fetch(`https://reklameservice.no/wp-json/wp/v2/visningssteder/${params.id}?_embed`);
  const media = await res2.json();
  return {props: {post, media}, revalidate: 10,};
}

export default Visningssted