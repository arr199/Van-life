/* eslint-disable react/react-in-jsx-scope */
import { useRouteError } from 'react-router'

export const VansError = () => {
  const error = useRouteError()

  return (
        <>
        <h1 style={{ padding: '1em' }} >Error : {error.message}</h1>
        <h2></h2>
        </>
  )
}
