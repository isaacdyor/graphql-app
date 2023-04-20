import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'

const GET_POSTS = gql`
query Query {
  getPosts {
    author {
      email
      id
      password
    }
    authorId
    description
    id
    title
  }
}
`
const PostsPage: React.FC = () => {
  const { loading, error, data } = 
  useQuery(GET_POSTS)
  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getPosts.map(({ id, title, description, author }: 
    {id: string, title: string, description: string, author: {email: string, password: string, id: string}}) => (
    <div key={id}>
      <h3><Link to={`/posts/${id}`}>{title}</Link></h3>
      <p>{description}</p>
      <p><Link to={`/users/${author.id}`}>{author.email}</Link></p>
    </div>
  ));
}

export default PostsPage