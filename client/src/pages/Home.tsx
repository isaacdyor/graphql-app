import { useEffect, useState} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'


const GET_BOARDS = gql`
  query Query {
    getBoards {
      id
      title
      description
      path
    }
  } 
`

const CREATE_BOARD = gql`
  mutation CreateBoard($input: CreateInput!) {
    createBoard(input: $input) {
      title
      path
      description
    }
  }
`;

const DELETE_BOARD = gql`
  mutation Mutation($input: DeleteInput!) {
    deleteBoard(input: $input) {
      description
      path
      title
    }
  }
`;

function Trial(): JSX.Element {
  const { loading, error, data } = 
  useQuery(GET_BOARDS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return data.getBoards.map(({ id, title, description, path }: 
    {id: string, title: string, description: string, path: string}) => (
    <div key={id}>
      <p>{title}</p>
      <DeleteButton id={id}/>
    </div>
  ));

}

function CreateForm(): JSX.Element {
  const [addTodo, { data, loading, error }] = useMutation(CREATE_BOARD, {
    refetchQueries: [
      {query: GET_BOARDS}
    ],
  });

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ path, setPath ] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo({
      variables: {
        input: {
          title,
          description,
          path
        }
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="path" value={path} onChange={(e) => setPath(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function DeleteButton({ id } : { id: string }): JSX.Element {
  const [deleteBoard, { data, loading, error }] = useMutation(DELETE_BOARD, {
    refetchQueries: [
      {query: GET_BOARDS}
    ],
  });

  const handleClick = () => {
    console.log(id)
    deleteBoard({
      variables: {
        input: {
          id
        }
      }
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Delete</button>
    </div>
  )
}

function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Link to="/about/1">About</Link>
      <button onClick={() => navigate('/about')}>About Page</button>
      <Trial />
      <CreateForm />
    </div>
  )
}

export default HomePage