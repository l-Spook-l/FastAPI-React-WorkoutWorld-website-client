import React, { useState } from 'react';
import style from './FormPhotoEditor.module.css'
import { addNewPhotos, deletePhotos } from '../../../http/workoutAPI';
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked  } from "react-icons/md";


const FormPhotoEditor = ({ exerciseId, exerciseName, existingPhotos }) => {

  const [photos, setPhotos] = useState(existingPhotos)
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [newPhotos, setNewPhotos] = useState([])

  const selectedDeletePhotos = (photoId) => {
    if (!selectedPhotos.includes(photoId)) {
      setSelectedPhotos([...selectedPhotos, photoId])
    } else {
      const selectPhoto = selectedPhotos.filter((id) => id !== photoId)
      setSelectedPhotos(selectPhoto)
    }
  }

  const deleteSelectPhotos = () => {
    deletePhotos(exerciseId, selectedPhotos)
    const updatedPhotos = photos.filter((photo) => !selectedPhotos.includes(photo.id))
    setPhotos(updatedPhotos)
    setSelectedPhotos([])
  }

  const selectNewPhotos = (event) => {
    const file = event.target.files[0]
    if (event.target.files[0] === undefined) {
      setNewPhotos([])
    } else {
      setNewPhotos([...newPhotos, event.target.files])
    }
  }

  const saveNewPhotos = () => {
    addNewPhotos(exerciseId, exerciseName, newPhotos[0])
    setNewPhotos([])
  }

  return (
    <div className={style.container}>
      <label htmlFor="">Add new photos: </label>
      <input type="file" accept="image/*" multiple onChange={selectNewPhotos}/>
      <button disabled={!newPhotos.length > 0} onClick={() => saveNewPhotos()}>Save new photos</button>
      <div>
        {photos.length !== 0 &&
        <div className={style.mainBlock}>
          {photos.map((photo, index) => (
            <div key={photo.id}>
              <button className={style.buttonSelectPhoto} onClick={() => selectedDeletePhotos(photo.id)}>
                {selectedPhotos.includes(photo.id) ? <MdOutlineRadioButtonChecked/> : <MdOutlineRadioButtonUnchecked/>}
              </button>
              <img className={style.selectPhoto} src={process.env.REACT_APP_API_URL + photo.photo}/>
            </div>
          ))}
        </div>
        }
        {photos.length !== 0 &&
          <button 
          className={style.buttonDeletePhoto} disabled={!selectedPhotos.length > 0} 
          onClick={() => deleteSelectPhotos()}>
            Delete photo
          </button>
        }
      </div>
    </div>
  )
}

export default FormPhotoEditor;
