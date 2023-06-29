"use client"

import React, { useEffect, useState } from "react"

interface BackendData {
  id: number;
  name: string;
}

export default function Home() {
  const [backendData, setBackendData] = useState<BackendData[]>([]);
  const [newSimpson, setNewSimpson] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8080/api/sCharacters').then(response => response.json())
      .then(data => { console.log("data", data); setBackendData(data) })
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('http://localhost:8080/api/sCharacters', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newSimpson })
    }).then(response => response.json()).then(data => {
      setBackendData([...backendData, data]);
      setNewSimpson('')
    })
  };


  return (
    <main>
      <h1>My React App</h1>
      <h2>Simpsons</h2>
      <div>
        {!backendData ? <p>Loading...</p> : backendData.map((simpson, index) => {
          return (<div className="item" key={index}>{simpson.name}</div>)
        })}
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" minLength={4} maxLength={20} placeholder="Enter a name" value={newSimpson} onChange={(event) => setNewSimpson(event.target.value)} />
          </div>
          <button className="add-button" type="submit">Add User</button>
        </div>
      </form>
    </main>
  )
}
