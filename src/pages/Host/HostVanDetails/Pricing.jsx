/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from 'react'
import { useOutletContext } from 'react-router'

export const Pricing = () => {
  const { id, vans } = useOutletContext()

  const renderVan = useMemo(() => {
    if (!vans) return
    return [...vans].filter(e => e.id === id)
  }, [vans])
  return (
        <>{renderVan
          ? <p style={{ padding: '1em', fontSize: '1.4em' }} ><strong>${renderVan[0].price}</strong>/day</p>
          : <div className="loader"></div>

        }

        </>
  )
}
