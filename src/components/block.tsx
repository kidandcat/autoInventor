import * as React from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";
import { Task } from "../tools/composer";

export type BlockProps = {
  task: {
    action: string;
    params: string[];
    data: object;
  };
};

export type BlockState = {
  expanded: boolean;
};

export class Block extends React.Component<BlockProps, BlockState> {
  me: HTMLElement;
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  toggle = () => {
    this.setState((prev: any) => ({
      expanded: !prev.expanded
    }));
  };

  remove = () => {
    try {
      this.me.parentNode.removeChild(this.me);
    } catch (e) {}
  };

  render() {
    const { task: { action, params, data = null } } = this.props;
    return (
      <BlockContaner
        onClick={this.toggle}
        className="list-group-item"
        data-params={params}
        innerRef={me => {
          this.me = me;
        }}
      >
        <Name className="name">{action}</Name>
        <Remove onClick={this.remove}>X</Remove>
        <Collapse isOpened={this.state.expanded}>
          <ParamsContainer>
            {params.map((p, i) => (
              <ParamContainer key={i}>
                <Param>{p}</Param>
                <ParamInput
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  defaultValue={(() => {
                    let dat = "";
                    try {
                      if (data && data[p]) {
                        dat = data[p];
                      }
                    } catch (e) {
                      console.log("error getting params");
                    }
                    const dataa = data[p];
                    setTimeout(() => {
                      try {
                        const params = this.me.dataset.params.split(",");
                        delete params[params.indexOf(p)];
                        params.push(`${p}=${dataa}`);
                        this.me.dataset.params = cleanArray(params);
                        console.log("P", params);
                      } catch (e) {
                        console.log("error parsing params");
                      }
                    }, 1000);
                    return dat;
                  })()}
                  onInput={event => {
                    const params = this.me.dataset.params.split(",");
                    const name = params
                      .filter((f: string) => ~f.indexOf(p))[0]
                      .split("=")[0];
                    params.splice(params.indexOf(p), 1);
                    params.push(name + "=" + event.target.value);
                    try {
                      event.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.params = params.join(
                        ","
                      );
                    } catch (e) {}
                  }}
                />
              </ParamContainer>
            ))}
          </ParamsContainer>
        </Collapse>
      </BlockContaner>
    );
  }
}

const BlockContaner = styled.div`
  border-color: skyblue;
`;

const ParamsContainer = styled.div`
  height: auto;
  margin-top: 20px;
`;

const ParamContainer = styled.div`
  color: grey;
  display: flex;
`;

const Param = styled.div`
  display: inline-block;
  margin: 10px;
  flex: 1;
`;

const ParamInput = styled.input`
  height: 30px;
  flex: 5;
  margin-top: 5px;
`;

const Name = styled.div`
  pointer-events: none;
  text-align: center;
  font-weight: bold;
`;

const Remove = styled.button`
  float: right;
  margin-top: -23px;
  border: 1px solid palevioletred;
  border-radius: 500px;
  background: none;
  outline: none;
  height: 25px;
  width: 25px;
`;

function cleanArray(actual: any) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
