import * as React from "react";
import styled from "styled-components";
import { Task } from "../tools/composer";
import { Blocks } from "../blocks";
import { Block } from "./block";
import { run } from "../tools/composer";
const Sortable = require("sortablejs");

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
        <RunButton onClick={runner}>Run</RunButton>
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
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  padding: 4px 44px 4px 44px;
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

function getActions() {
  const list = document.querySelectorAll("#simpleList2 .list-group-item");
  const actions = [];
  for (var i = 0; i < list.length; i++) {
    const el = list[i];
    actions.push({
      action: list[i].querySelector(".name").innerHTML,
      params: getObj(list[i].dataset.params)
    });
  }
  return actions;
}

function runner() {
  const actions = getActions();
  run("Test", actions);
}

function getObj(array) {
  const res = {};
  const tuplas = array.split(",");
  tuplas.forEach(t => {
    res[t.split("=")[0]] = t.split("=")[1];
  });
  return res;
}
