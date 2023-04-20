import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

const GET_POST = gql`
  query Query($getPostId: ID!) {
    getPost(id: $getPostId) {
      title
      description
      id
      author {
        password
        id
        email
      }
    }
  }
`
const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = 
  useQuery(GET_POST, {variables: {getPostId: id}})
  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>{data.getPost.title}</h3>
      <p>{data.getPost.description}</p>
      <p><Link to={`/users/${data.getPost.author.id}`}>{data.getPost.author.email}</Link></p>
    </div>
  );
}

export default PostDetailPage