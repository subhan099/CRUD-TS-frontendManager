import React from "react";
import { useState } from "react";

export default function Update({
  email,
  handleUpdateSubmit,
  handleInputChange,
  updateFormVisibility,
  setUpdateFormVisibility,
  updatedData,
  setUpdatedData,
}: {
  email: string;
  handleUpdateSubmit: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateFormVisibility: { [email: string]: boolean };
  setUpdateFormVisibility: (visibility: { [email: string]: boolean }) => void;
  updatedData: {
    name: string;
    email: string;
    message: string;
  }; // Define the type for updatedData
  setUpdatedData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      message: string;
    }>
  >;
}) {
  return (
    <div>
      {updateFormVisibility[email] && (
        <div>
          <form onSubmit={handleUpdateSubmit}>
            <div>
              Enter Your Name:
              <input
                type="text"
                name="name"
                id="name"
                value={updatedData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              Enter your Email:
              <input
                type="text"
                name="email"
                id="email"
                value={updatedData.email}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              Enter your message:
              <input
                type="text"
                name="message"
                id="message"
                value={updatedData.message}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
