import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

const GET_USER = gql`
  query Query($getUserId: ID!) {
    getUser(id: $getUserId) {
      email
      id
      password
      posts {
        description
        id
        title
      }
    }
  }
`
const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = 
  useQuery(GET_USER, {variables: {getUserId: id}})
  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>User: {data.getUser.email}</h3>
      <p>Posts:</p>
      {
        data.getUser.posts.map(({ id, title, description }:
          {id: string, title: string, description: string}) => (
          <div key={id}>
            <h3><Link to={`/posts/${id}`}>{title}</Link></h3>
            <p>{description}</p>
          </div>
        ))
      }
    </div>
  )


}

export default ProfilePage