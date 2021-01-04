import React from 'react';
import Link from 'next/link';

export default function Posts({posts}) {
  return (<ul>
    { posts.map((post) => {
        return <li key={post.id}>
          <h3><Link href="/posts/[id]" as={"/posts/" +  post.id}><a>{post.title}</a></Link></h3>
          <p>{post.body}</p>
        </li>
      })
    }
  </ul>);
};

export async function getStaticProps(){
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json();

  // By returning { props: posts }, the post component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    }, // will be passed to the page component as props
  }
}

// export async function getServerSideProps(){
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
//   const posts = await res.json();

//   // By returning { props: posts }, the post component
//   // will receive `posts` as a prop at request time
//   return {
//     props: {
//       posts
//     }, // will be passed to the page component as props
//   }
// }