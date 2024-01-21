export async function createPhotoRequest(formData) {
  const endpoint = `http://127.0.0.1:8000/api/photos/`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const updatedData = await response.json();
      return updatedData;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating photo:", error);
    throw error;
  }
}

export async function updatePhotoRequest(formData, photoId) {
  const endpoint = `http://127.0.0.1:8000/api/photos/${photoId}/`;
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      const updatedData = await response.json();
      return updatedData;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating photos:", error);
    throw error;
  }
}

export async function getPhotosByVisitId(visitId) {
  const endpoint = `http://127.0.0.1:8000/api/photos/?visit_id=${visitId}`;

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  throw new Error(
    "Response ${response.status}: ${response.statusText} - ${await response.text()}"
  );
}

export async function deletePhotoById(photoId) {
  const endpoint = `http://localhost:8000/api/photos/${photoId}/`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
}

export async function patchUpdatePhotoRequest(formData, photoId) {
  const endpoint = `http://127.0.0.1:8000/api/photos/${photoId}/`;
  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      body: formData,
    });
    if (response.ok) {
      const updatedData = await response.json();
      return updatedData;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating photos:", error);
    throw error;
  }
}
