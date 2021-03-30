import React from "react";
import { Button, Container } from "reactstrap";

export class IndexHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="page-header section-dark"
          style={{backgroundImage:"url(" + require("assets/img/produce.jpg").default + ")",}}>
          <div className="filter" />
          <div className="content-center">
            <Container>
              <div className="title-brand">
                <h1 className="title">Something about savings</h1>
                <Button className="btn" color="success" href="/new-list">Create List</Button>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
}
