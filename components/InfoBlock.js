import React, { Component } from 'react';
import styled from 'styled-components';
const Div = styled.div`
  margin: 10px;
  height: 100px;
  width: 800px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,133,242,.1);
  border: 1px solid grey;
  border-left: 5px solid blue;
  border-radius: 6px;
`;

const Paragraf = styled.div`
  margin: 10px;
  position: relative;
  top: 5px;
`;

const Title = styled.div`
  color: grey;
  position: relative;
  left: 10px;
  top: 10px;
`;

export class InfoBlock extends React.Component {
  render() {
      return (
      <Div>
        <Title><b>Info</b></Title>
        <Paragraf><i>{this.props.children}</i></Paragraf>
      </Div>)
  }
}

export default InfoBlock