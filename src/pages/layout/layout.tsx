import React from "react";
import Header from "../Header/header";
import Button_bar from "../ButtonBar/button_bar";

export default function Layout() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Button_bar />
      </div>
    </div>
  );
}
