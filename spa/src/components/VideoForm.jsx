import React, {useState, useEffect} from 'react';
import {listCategories, createVideo} from "../services/API";
import Video from "../components/Video";
import FilesDragAndDrop from "./FilesDragAndDrop"

import "./VideoForm.css";

const VideoForm = props => {
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const[uploadedFile, setUploadedFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    listCategories()
      .then(items => { setCategories(items) })
  }, [])

  const submitForm = (event) => {
    event.preventDefault();
    setIsUploading(true);

    const formData = new FormData(event.target);

    formData.append('file', uploadedFile);
    formData.append('category_id', categoryId);
    formData.append('title', title);

    createVideo(formData)
      .then(data => {
        setIsUploading(false);
        setMessage("Video successfully uploaded");
        setTitle("");
        event.target.file.value = null;
        setCategoryId("");
        setUploadedFile("");
      })
      .catch(errorMessage => {
        setIsUploading(false);
        setMessage(`Failed to upload video: ${errorMessage}`);
      });
  }

  return (
    <form className="video-form" onSubmit={submitForm}>
      {
        message &&
        <div className="alert alert-secondary" role="alert">
          {message}
        </div>
      }

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          File
        </label>
        <div className="max-w-sm mx-auto">
          <FilesDragAndDrop
            onFileUpload={(file) => setUploadedFile(file)}
          />
        </div>

        {
          uploadedFile && (
            <Video
              title={title}
              url={URL.createObjectURL(uploadedFile)}
            />
          )
        }
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category_id"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          onBlur={e => setCategoryId(e.target.value)}
          required
          className="form-select"
        >
          <option />
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" disabled={isUploading} value={isUploading ? 'Submitting...' : 'Submit' } className="btn btn-primary"/>
    </form>
  );
  
}

export default VideoForm;
