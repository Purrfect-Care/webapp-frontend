export async function getPatientAbout(){
    const endpoint = `http://localhost:8000/api/patients/${patientId}/`;

    const response = await fetch(endpoint, { 
    headers: {
        'Content-Type': 'application/json'
    },
        method: "GET",
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    }

    throw new Error(`Response ${response.status}: ${response.statusText} - ${await response.text()}`);
}