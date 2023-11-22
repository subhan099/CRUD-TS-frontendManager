import React, { useState } from "react";
import Form from "../Form/form";
import Update from "../Update/update";

export default function Button_bar() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState<
    Array<{ name: string; email: string; message: string }>
  >([]);
  const [email, setEmail] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedData, setUpdatedData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });

  const [showData, setShowData] = useState(true);

  // Use an object to track update form visibility for each item
  const [updateFormVisibility, setUpdateFormVisibility] = useState<{
    [email: string]: boolean;
  }>({});

  const handleCreate = () => {
    setEmail("");
    setShowForm(true); // Toggle showForm based on the value of showUpdateForm
    setShowUpdateForm(false); // Always set showUpdateForm to false when creating
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const handleNotes = () => {
    setShowData(!showData);
  };

  const handleRemoveItem = (email: any) => {
    setData(data.filter((item) => item.email !== email));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdateSubmit = () => {
    // Find the index of the item to update in the data array
    const indexToUpdate = data.findIndex(
      (item) => item.email === updatedData.email
    );

    if (indexToUpdate !== -1) {
      // Create a copy of the data array
      const updatedDataArray = [...data];

      // Update the item at the found index with the new values
      updatedDataArray[indexToUpdate] = updatedData;

      // Update the data state with the updated array
      setData(updatedDataArray);

      // Hide the update form after submitting
      setUpdateFormVisibility({
        ...updateFormVisibility,
        [updatedData.email]: false,
      });

      // Reset the form and show the Create form
      setUpdatedData({ name: "", email: "", message: "" });
      setShowForm(!showForm); // Toggle showForm to create
      setShowUpdateForm(false); // Always set showUpdateForm to false after update
    }
  };

  return (
    <div className="button_bar">
      <button className="btn" onClick={handleCreate}>
        Create
      </button>
      <button className="btn" onClick={handleNotes}>
        Read all Notes
      </button>
      {showForm && (
        <Form
          hideForm={hideForm}
          data={data}
          setData={setData}
          email={email}
          handleUpdateSubmit={handleUpdateSubmit}
          handleInputChange={handleInputChange}
          updateFormVisibility={updateFormVisibility}
          setUpdateFormVisibility={setUpdateFormVisibility}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
        />
      )}
      {showUpdateForm && (
        <Form
          hideForm={hideForm}
          data={data}
          setData={setData}
          email={email}
          handleUpdateSubmit={handleUpdateSubmit}
          handleInputChange={handleInputChange}
          updateFormVisibility={updateFormVisibility}
          setUpdateFormVisibility={setUpdateFormVisibility}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
        />
      )}
      {showData && (
        <div>
          {data.map((item) => (
            <div className="info_box" key={item.email}>
              <p>Name:{item.name}</p>
              <p>Email:{item.email}</p>
              <p>Message:{item.message}</p>
              <div className="buttons">
                <button
                  className="btn"
                  onClick={() => {
                    // Toggle the update form visibility for this item's email
                    setUpdateFormVisibility({
                      ...updateFormVisibility,
                      [item.email]: !updateFormVisibility[item.email],
                    });
                    setShowUpdateForm(true);
                    setShowForm(false);
                    setEmail(item.email);
                    setUpdatedData(item); // Set the updated data with the current item's values
                  }}
                >
                  Update
                </button>
                <button
                  className="btn"
                  onClick={() => handleRemoveItem(item.email)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
