import * as React from "react";
import styled from "styled-components";
import { Task } from "../tools/composer";
import { Blocks } from "../blocks";
import { Block } from "./block";
import { run } from "../tools/composer";
const Sortable = require("sortablejs");
const fs = require("fs");

export type State = {
  script: Task[];
};
export class App extends React.Component<{}, State> {
  script: Task[] = [];

  constructor() {
    super();
    this.state = {
      script: []
    };
  }

  setActions = (actions: any) => {
    this.state.script = actions.map((a: any) => ({
      action: a.action,
      params: Object.keys(a.params),
      data: a.params
    }));
    console.log("setting actions", actions);
    this.forceUpdate();
  };

  getActions = () => {
    const list = document.querySelectorAll("#simpleList2 .list-group-item");
    const actions = [];
    for (var i = 0; i < list.length; i++) {
      const el = list[i];
      actions.push({
        action: list[i].querySelector(".name").innerHTML,
        params: this.getObj(list[i].dataset.params)
      });
    }
    return actions;
  };

  runner = () => {
    const actions = this.getActions();
    run("Test", actions);
  };

  getObj = (array: any) => {
    const res = {};
    const tuplas = array.split(",");
    tuplas.forEach(t => {
      res[t.split("=")[0]] = t.split("=")[1];
    });
    return res;
  };

  save = () => {
    console.log("the actions", this.state.script);
    dialog.showSaveDialog((fileName: string) => {
      if (fileName === undefined) return;

      fs.writeFile(
        fileName,
        JSON.stringify(this.getActions()),
        (err: Error) => err && alert(err)
      );
    });
  };

  load = () => {
    dialog.showOpenDialog((fileName: string) => {
      if (fileName === undefined) return;

      fs.readFile(fileName[0], "utf8", (err: Error, data: string) => {
        let parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          alert("Cannot read data from file (BAD FORMAT)");
        }
        if (err) alert(err.message);
        else this.setActions(parsedData);
      });
    });
  };

  componentDidMount() {
    const self = this;
    Sortable.create(document.getElementById("simpleList1"), {
      sort: false,
      draggable: "div",
      group: {
        name: "blocks",
        pull: "clone",
        put: (to: any, from: any, target: any) => {
          if (target && target.parentNode)
            target.parentNode.removeChild(target);
        }
      }
    });
    Sortable.create(document.getElementById("simpleList2"), {
      sort: true,
      draggable: "div",
      onAdd: (event: any) => {
        this.setState(prev => ({
          script: [
            ...prev.script,
            {
              action: event.item.innerHTML,
              params: event.item.dataset.params.split(",")
            }
          ]
        }));
      },
      group: {
        name: "blocks",
        put: (to: any, from: any, target: any) => {
          const si: any = setInterval(() => {
            if (
              !target.classList.contains("sortable-ghost") &&
              target.parentNode.id == "simpleList2"
            ) {
              target.parentNode.removeChild(target);
              clearInterval(si);
            } else if (!target.classList.contains("sortable-ghost")) {
              clearInterval(si);
            }
          }, 100);
          return true;
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <LeftList id="simpleList1" className={`col-sm-4`}>
            {Blocks.units.map(b => (
              <LeftBlock
                className="list-group-item"
                key={b.action}
                data-params={b.params}
              >
                {b.action}
              </LeftBlock>
            ))}
            {Blocks.custom.map(b => (
              <LeftBlock
                className="list-group-item"
                key={b.action}
                data-params={b.params}
              >
                {b.action}
              </LeftBlock>
            ))}
          </LeftList>
          <RightList id="simpleList2" className={`col-sm-offset-2 col-sm-6`}>
            {this.state.script.map((b, i) => <Block key={i} task={b} />)}
          </RightList>
        </div>
        <RunButton onClick={this.runner}>Run</RunButton>
        <SaveButton onClick={this.save}>Save</SaveButton>
        <LoadButton onClick={this.load}>Load</LoadButton>
      </div>
    );
  }
}

const LeftBlock = styled.div`
  text-align: center;
`;

const RunButton = styled.button`
  border: none;
  border-radius: 50em;
  outline: none;
  background: white;
  position: fixed;
  padding: 15px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  padding: 8px 60px 8px 60px;
  background-color: blue;
  opacity: 0.5;
  color: white;
`;

const SaveButton = styled.button`
  border: none;
  border-radius: 50em;
  outline: none;
  background: white;
  position: fixed;
  left: 15px;
  bottom: 10px;
  padding: 4px 34px 4px 34px;
  background-color: green;
  opacity: 0.5;
  color: white;
`;

const LoadButton = styled.button`
  border: none;
  border-radius: 50em;
  outline: none;
  background: white;
  position: fixed;
  left: 125px;
  bottom: 10px;
  padding: 4px 34px 4px 34px;
  background-color: grey;
  opacity: 0.5;
  color: white;
`;

const LeftList = styled.div`
  border-radius: 10px;
  padding: 5px;
  margin-top: 30px;
  background-color: white;
`;

const RightList = styled.div`
  border-radius: 10px;
  padding: 5px;
  margin-top: 30px;
  min-height: 100px;
  background-color: white;
`;
