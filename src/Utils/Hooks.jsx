import { useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { GlobalContext } from '../components/Layout'

export const firebaseConfig = {
  apiKey: 'AIzaSyAC-F6A7g1TD0AXr2cS0-lRbmWm75RzMPU',
  authDomain: 'vanlife-app-d9f83.firebaseapp.com',
  projectId: 'vanlife-app-d9f83',
  storageBucket: 'vanlife-app-d9f83.appspot.com',
  messagingSenderId: '617600971884',
  appId: '1:617600971884:web:1576c70d03f07afc559449'
}

export const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vansCollection = collection(db, 'vans')

// GET THE TOTAL NUMBER OF VANS
export function useGetVans () {
  const [vans, setVans] = useState([])
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    setIsLoading(true)
    async function getVans () {
      try {
        const snapshot = await getDocs(vansCollection)
        const vans = await snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
        setVans(vans)
        setIsLoading(false)
      } // eslint-disable-line brace-style
      catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    getVans()
  }, [])

  return { vans, isLoading, error }
}

// GET THE HOST VANS
export function useGetHostVans () {
  const [hostVans, setHostVans] = useState()
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const { userLogged } = useContext(GlobalContext)
  useEffect(() => {
    setIsLoading(true)
    async function getHostVans () {
      try {
        const snapshot = await getDocs(vansCollection)
        const vans = await snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
        const userVans = [...vans].filter(e => e.hostId === userLogged)
        setHostVans(e => {
          setIsLoading(false)
          return userVans ?? null
        })
      } // eslint-disable-line brace-style
      catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    getHostVans()
  }, [])

  return { hostVans, isLoading, error }
}

// FETCHING THEN VANS
export async function getVans () {
  try {
    const snapshot = await getDocs(vansCollection)
    const vans = await snapshot.docs.map(e => ({ ...e.data(), id: e.id }))
    return vans ?? null
  } catch (err) {
    throw new Error('Failed loading vans ')
  }
}

// ADD DATA TO FIREBASE
export async function addVan (formData) {
  await setDoc(doc(db, 'vans', formData.name), {
    name: formData.name,
    description: formData.description,
    type: formData.type,
    price: formData.price,
    hostId: formData.hostId,
    imageUrl: formData.imageUrl
  })
}
