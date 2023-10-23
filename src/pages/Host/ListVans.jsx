/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react'
import '../../styles/Host-ListVans.css'
import { addVan, app } from '../../Utils/Hooks'
import { GlobalContext } from '../../components/Layout'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router'

export const ListNow = () => {
  const { userLogged } = useContext(GlobalContext)
  const [addingVan, setAddingVan] = useState('idle')
  const [error, setError] = useState()
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'simple',
    price: '',
    hostId: userLogged,
    imageUrl: ''
  })

  function handleSubmit (e) {
    setAddingVan('adding')
    e.preventDefault()
    // WE GET THE REFERENCE TO OUR STORAGE BUCKET IN FIREABASE
    const storage = getStorage(app)
    const vansImagesRef = ref(storage, `${image.name}`)
    // UPLOAD THE IMG BEFORE PUSH THE OTHER INFORMATION BC WE NEED THE IMG URL FROM
    // FIRABASE
    uploadBytes(vansImagesRef, image).then((snapshot) => {
      // WE GET THE URL OF OUR VAN IMG
      getDownloadURL(ref(storage, `gs://vanlife-app-d9f83.appspot.com/${image.name}`))
        .then(url => {
          // AND NOW WE CAN PUSH OUR NEW VAN WITH ALL THE FORM INFO AND ADDING
          // THE FIRABASE IMG URL TO OUR OBJECT formData.imgUrl
          addVan({ ...formData, imageUrl: url }).then(data => {
            setAddingVan('idle')
            navigate('/host/vans', { replace: true })
          })
        })
    }).catch(err => {
      setError(err)
      setAddingVan('idle')
    }).finally(() => setAddingVan('idle'))
  }

  function handleFileUpload (e) {
    const file = e.target?.files?.[0]
    setImage(file)
  }

  return (
        <section className='list-vans-container'>
            <form onSubmit={handleSubmit} className="list-vans-form" action="" >
                   {error && <h2 style={{ color: 'red' }}>{error}</h2>}
                   <h1 style={{ textAlign: 'center', fontSize: '32px' }}>Add Your van</h1>
                    <input type="text" placeholder="Name" className='name' required
                       value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input style={{ paddingBottom: '4em' }} className='description' type="text" placeholder="Description" required
                       value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    <input type="number" placeholder="Price $/Day" className='price ' required
                       value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    {/* TYPE LABEL AND SELECT BOX */}
                    <div className='file-container'>
                        <div>
                        <label htmlFor="">Type</label>
                        <select onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                            <option selected="selected" value="simple">Simple</option>
                            <option value="rugged">Rugged</option>
                            <option value="luxury">Luxury</option>
                        </select>
                        </div>
                    {/* UPLOAD FILE */}
                    <input onChange={handleFileUpload} className='file' type="file" accept='image/png , image/jpg' required />
                    </div>
                    <button
                    style={{ background: addingVan === 'adding' ? 'gray' : '' }}
                    className=''> {addingVan === 'adding' ? 'Adding van' : 'Add Van' }</button>
            </form>
        </section>
  )
}
