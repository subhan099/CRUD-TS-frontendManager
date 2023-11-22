import React, { useState } from "react";

export default function Form({
  hideForm,
  data,
  setData,
  email,
  handleUpdateSubmit,
  handleInputChange,
  updateFormVisibility,
  setUpdateFormVisibility,
  updatedData,
  setUpdatedData,
}: {
  hideForm: () => void;
  data: Array<{
    name: string;
    email: string;
    message: string;
  }>;
  setData: React.Dispatch<React.SetStateAction<typeof data>>;
  email: string;
  handleUpdateSubmit: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateFormVisibility: { [email: string]: boolean };
  setUpdateFormVisibility: (visibility: { [email: string]: boolean }) => void;
  updatedData: {
    name: string;
    email: string;
    message: string;
  };
  setUpdatedData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      message: string;
    }>
  >;
}) {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const isCreating = email === "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCreating) {
      if (!updatedData.name.trim() || updatedData.name.trim().length < 2) {
        setNameError("Name should be at least 2 characters long");
      } else {
        setNameError("");
      }

      if (!updatedData.email.trim()) {
        setEmailError("Email is required");
      } else {
        setEmailError("");
      }

      if (
        !updatedData.message.trim() ||
        updatedData.message.trim().length < 2
      ) {
        setMessageError("Message should be at least 2 characters long");
      } else {
        setMessageError("");
      }

      if (
        updatedData.name.trim() &&
        updatedData.name.trim().length >= 2 &&
        updatedData.email.trim() &&
        updatedData.message.trim() &&
        updatedData.message.trim().length >= 2
      ) {
        const newData = {
          name: updatedData.name,
          email: updatedData.email,
          message: updatedData.message,
        };
        setData([...data, newData]);
        setUpdatedData({ name: "", email: "", message: "" });
        hideForm();
      }
    } else {
      setNameError("");
      setEmailError("");

      const updatedDataArray = data.map((item) => {
        if (item.email === updatedData.email) {
          return {
            ...item,
            name: updatedData.name,
            message: updatedData.message,
          };
        }
        return item;
      });

      setData(updatedDataArray);
      setUpdatedData({ name: "", email: "", message: "" });
      hideForm();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "name" && nameError) {
      setNameError("");
    }
    if (name === "email" && emailError) {
      setEmailError("");
    }
    if (name === "message" && messageError) {
      setMessageError("");
    }

    // Handle input change
    handleInputChange(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Enter Your Name:
          <input
            type="text"
            name="name"
            id="name"
            value={updatedData.name}
            onInput={handleInput}
            style={{ borderColor: nameError ? "red" : "" }}
          />
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        </div>
        <div>
          Enter your Email:
          <input
            type="email"
            name="email"
            id="email"
            value={updatedData.email}
            readOnly={!isCreating}
            onInput={handleInput}
            style={{ borderColor: emailError ? "red" : "" }}
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </div>
        <div>
          Enter your message:
          <input
            type="text"
            name="message"
            id="message"
            value={updatedData.message}
            onInput={handleInput}
            style={{ borderColor: messageError ? "red" : "" }}
          />
          {messageError && <div style={{ color: "red" }}>{messageError}</div>}
        </div>
        <button type="submit">{isCreating ? "Create" : "Update"} </button>
      </form>
    </div>
  );
}
