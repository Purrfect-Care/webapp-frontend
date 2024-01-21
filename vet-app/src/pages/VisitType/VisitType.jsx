import React, { useState, useEffect } from "react";
import { visitTypesRequest } from "../../api/visitsRequests.js";

function VisitTypePage() {
  const [visitTypes, setVisitTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await visitTypesRequest();
        setVisitTypes(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Visit Types</h1>
      <ul>
        {visitTypes.map((visitType) => (
          <li key={visitType.id}>{visitType.visit_type_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default VisitTypePage;
