"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSendPost from "./useSendPost";
import { useState } from "react";

const getSimpsons = async () => {
  const response = await axios.get("http://localhost:8080/api/sCharacters");

  return response.data;
};

interface BackendData {
  id: number;
  name: string;
}


export function About() {
  const { data, status } = useQuery(["simpsons"], getSimpsons);
  const [newSimpson, setNewSimpson] = useState<string>('');
  const { mutate: sendPost } = useSendPost();

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendPost(newSimpson);
		setNewSimpson("")
  };
	
  console.log(data);
  return (
    <div>
      <h1>My React App</h1>
      <h2>Simpsons</h2>
      <div>
        {!data ? (
          <p>Loading...</p>
        ) : (
          data.map((simpson, index) => {
            return (
              <div className="item" key={index}>
                {simpson.name}
              </div>
            );
          })
        )}
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              minLength={4}
              maxLength={20}
              placeholder="Enter a name"
              value={newSimpson}
              onChange={(event) => setNewSimpson(event.target.value)}
            />
          </div>
          <button className="add-button" type="submit">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
