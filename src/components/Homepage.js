import React from "react";
import {IndexNavbar} from "./IndexNavbar";
import {IndexHeader} from "./IndexHeader";

// index sections
// import SectionButtons from "views/index-sections/SectionButtons.js";

export class Homepage extends React.Component {
  render() {
    return (
      <>
        <IndexNavbar />
        <IndexHeader />
        <div className="main">
        </div>
      </>
    );
  }
}
