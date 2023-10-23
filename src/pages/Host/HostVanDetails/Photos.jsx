/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from 'react'
import { useOutletContext } from 'react-router'

export const Photos = () => {
  const { id, vans } = useOutletContext()

  const renderVan = useMemo(() => {
    if (!vans) return
    return [...vans].filter(e => e.id === id)
  }, [vans])
  return (
        <>{renderVan
          ? <img style={{ padding: '1.5em' }} src={renderVan[0].imageUrl }/>
          : <div className="loader"></div>

        }

        </>
  )
}
