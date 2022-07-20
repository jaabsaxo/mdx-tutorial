import React, { useState, useEffect } from 'react';
import styles from "./ObjectDescription.module.css";

export default function ObjectDescription(props) {

  const [selected, setSelected] = useState("");
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
    setSelected(x);
  }


  function Off() {
    setSelected("");
  }


  function getD(d) {
    return (<details open onMouseOver={(e) => HandleMouseEnter(e)}><summary>{d.title}</summary>{d.description}</details>)
  }


  useEffect(() => {
    if (descriptions.length == 0) {
      setDescriptions(parseDescription(props.description));
    } 
    if (codeChunks.length == 0 && descriptions.length > 0) {
      setCodeChunks(parseCode(props.code, descriptions));
    }
  })


  function getItems() {
    const descriptionItems = descriptions.map((d, i) =>
      <li key={i}>{getD(d)}</li>
    );
    return (<ul style={{"list-style-type": "none"}}>{descriptionItems}</ul>);
  }


  function addLineNumbers(newLineNumber, chunks) {
    let lines = chunks.split("\n")
    let out = ""
    for (var j = 0; j < lines.length; j++) {
      let y = "<span>" + JSON.stringify(newLineNumber+j) + "</span>  " + lines[j] + "\n";
      out += y;
    }
    return out;
  }


  function getCode() {
    const codeChunkItems = codeChunks.map((c) => {
      let firstWord = c.split("\:")[0];
      firstWord = firstWord.replaceAll("\"", "");
      firstWord = firstWord.replaceAll(" ", "");

      console.log(c);

      if (selected == "") {
        return (<div className={styles.CodeSelected} in>{c}</div>)
      } else {
        if (firstWord==selected) {
          return (<div className={styles.CodeSelected}>{c}</div>)
        } else {
          return (<div className={styles.Code}>{c}</div>)
        }
      }

    });
    return (codeChunkItems);
  }

  function parseCode(code, descriptions) {
    let lines = code.split("\n");
    let x = []
    for (var j = 0; j < lines.length; j++) {
      let y = lines[j] + "\n";
      x.push(y);
    }

    lines = x;

    let codeChunks = ["{"];
    for(var i = 0;i < descriptions.length;i++) {
      let numbers = descriptions[i].numbers;
      let codeChunk = "";
      if (numbers[0] == numbers[1]) {
        codeChunk = lines[numbers[0]-1];
      } else {
        let codeLines = lines.slice(numbers[0]-1, numbers[1]);
        console.log(codeLines);
        codeChunk = codeLines.join("")
      }
      codeChunks.push(codeChunk)

    }
    codeChunks.push("}")

    console.log(codeChunks);
    return codeChunks;
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


  