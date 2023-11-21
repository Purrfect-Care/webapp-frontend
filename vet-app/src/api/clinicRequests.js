const form = document.getElementById('formClinic');

form.addEventListener('submit', async (event) => {
    try {
      event.preventDefault();
  
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
  
      const response = await fetch('http://127.0.0.1:8000/api/clinics/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log("Clinic added successfully");
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  });
  