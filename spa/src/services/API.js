export const listCategories = () => {
  return fetch('/api/categories',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
  .then(response => response.json());
}

export const listVideos = () => {
  return fetch('/api/videos',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
  .then(response => response.json());
}

export const createVideo = formData => {
  return fetch('/api/videos',
    {
      method: "POST",
      body: formData
    })
    .then(response => {
      const data = response.json()

      if (!response.ok) {
        return Promise.reject(data.message);
      } else {
        return data;
      }
    });
}
