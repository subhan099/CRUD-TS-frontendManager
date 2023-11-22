import { useState } from "react";

export const initialUpdatedData = {
  name: "",
  email: "",
  message: "",
};

export const useUpdatedData = () => {
  return useState(initialUpdatedData);
};
