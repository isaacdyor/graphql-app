import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

const CREATE_POST = gql`
  mutation Mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      title
      id
      description
      authorId
    }
  }
`;

const CreatePost: React.FC = () => {
  const [addTodo, { data, loading, error }] = useMutation(CREATE_POST);

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo({
      variables: {
        input: {
          title,
          description,
          authorId: "a9ed77b4-392f-4b06-a6de-15a20f8d1362"
        }
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost