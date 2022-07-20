import React, { useState, useEffect } from 'react';
import styles from "./OD.module.css";

export default function ObjectDescription(props) {

  const [selected, setSelected] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [codeChunks, setCodeChunks] = useState([]);

  function HandleMouseEnter(e) {
    let inner = e.target.innerHTML;
    let x = "";
    if (inner.split(">").length > 1) {
      x = inner.split(">")[1].split("</")[0]
    } else {
      x = inner;
    }
    x = x.replaceAll(" ", "");
    for (var j = 0; j < descriptions.length; j++) {
      let d = descriptions[j];
      if (d.title.toLowerCase() == x.toLowerCase()) {
        setSelected(descriptions[j].numbers);
      }
    }
  }


  function Off() {
    setSelected([]);
  }


  function getD(d) {
    return (<details open onMouseOver={(e) => HandleMouseEnter(e)}><summary>{d.title}</summary>{d.description}<hr></hr></details>)
  }


  useEffect(() => {
    if (descriptions.length == 0) {
      setDescriptions(parseDescription(props.description));
    } 
    if (codeChunks.length == 0) {
      setCodeChunks(parseCode(props.code));
    }
  })


  function getItems() {
    const descriptionItems = descriptions.map((d, i) =>
      <li key={i}>{getD(d)}</li>
    );
    return (<ul style={{"list-style-type": "none"}}>{descriptionItems}</ul>);
  }

  function getEachLine(n, l, isFocused) {
    let spacedLine = JSON.stringify(n) + "  ";
    if (isFocused) {
      return (<div className={styles.CodeFocus}><span className={styles.LineFocus}>{spacedLine}</span>{l}</div>)
    } else {
      return (<div className={styles.CodeHidden}><span className={styles.LineHidden}>{spacedLine}</span>{l}</div>)
    }
  }


  function getCode() {  
    let currentLineNumber = 0;
    const codeChunkItems = codeChunks.map((line) => {
      let isFocused = true;
      if (selected.length == 2) {
        isFocused = false;
        let start = parseInt(selected[0]);
        let stop = parseInt(selected[1]);
        if (currentLineNumber+2 >= start && currentLineNumber+2 <= stop) {
          isFocused = true
        }
      }
      currentLineNumber += 1;
      return getEachLine(currentLineNumber-1, line, isFocused)
    });
    return (codeChunkItems);
  }

  function parseCode(code) {
    let lines = code.split("\n");
    let chunks = []
    for (var j = 1; j < lines.length-1; j++) {
      let y = lines[j] + "\n";
      chunks.push(y);
    }
    console.log(chunks);
    return chunks;
  }


  function parseDescription(d) {
    let lines = d.split("\n");
    let out = [];
    let x = {}

    for(var i = 0;i < lines.length;i++){
      let line = lines[i];

      if (line != "") {
        if (line.charAt(0)==">") {
          if (out.length > 0) {
            x = {}
          }
          let title = line.split('>')[1];
          x["title"] = title
          out.push(x);
        } else if (line.charAt(0)=="-") {
          let numbers = line.split(',');
          numbers[0] = numbers[0].replace("-", "");
          out[out.length-1]["numbers"] = numbers
        } else {
          if (out[out.length-1]["description"]) {
            out[out.length-1]["description"] += line;
          } else {
            out[out.length-1]["description"] = line;
          }
        }
      }
    }
    return out;
  }


  return (<div className={styles.Main}>
        <div className={styles.Left} onMouseLeave={(e) => Off()}>
          {getItems()}
        </div>
        <div className={styles.Right}>
          <div className={styles.CodeBlock} onMouseOver={(e) => Off()}>
          {getCode()}
          </div>
        </div>
      </div>)
  }


  