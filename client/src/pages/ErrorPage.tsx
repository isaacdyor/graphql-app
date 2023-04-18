import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage: React.FC = () => {
    const error = useRouteError()

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>
                {isRouteErrorResponse(error) ?
                      (
                          error.error?.message || error.statusText
                      ) :
                      'Unknown error message'}
              </i>
            </p>
        </div>
    )
}

export default ErrorPage