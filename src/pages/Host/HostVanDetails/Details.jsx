/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from 'react'
import { useOutletContext } from 'react-router'

export const Details = () => {
  const { id, vans } = useOutletContext()
  console.log(id)
  console.log(id)
  const renderVan = useMemo(() => {
    if (!vans) return
    return [...vans].filter(e => e.id === id)
  }, [vans])

  return (<>{ renderVan
    ? <div className='details-container'>
                <p> <strong>Name:</strong> {renderVan[0].name}</p>
                <p><strong>Category:</strong>   {renderVan[0].type.slice(0, 1).toUpperCase() + renderVan[0].type.slice(1) }</p>
                <p><strong>Description:</strong> {renderVan[0].description}</p>
                <p><strong>Visibility:</strong> Public</p>

            </div>
    : <div className="loader"></div>}</>
  )
}
