import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Post({postData}) {

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading Post data...</div>
  }
  
  return (
    <div>
      <Link href="/posts">Go back to Posts Page</Link>
      <h2>{postData.title}</h2>
      <p>{postData.body}</p>
    </div>
  )
};

export async function getStaticPaths(){
  const paths = ["/posts/1", "/posts/2"];
  return { paths, fallback: true }
}

export async function getStaticProps({query, params}){
  const {id} = query || params;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const postData = await res.json();

  // By returning { props: postData }, the post component
  // will receive `postData` as a prop at build time
  return {
    props: {
      postData
    }, // will be passed to the page component as props
  }
}

// export async function getServerSideProps({query}){

//   const {id} = query;

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//   const postData = await res.json();

//   // By returning { props: postData }, the post component
//   // will receive `postData` as a prop at request time
//   return {
//     props: {
//       postData
//     }, // will be passed to the page component as props
//   }
// }