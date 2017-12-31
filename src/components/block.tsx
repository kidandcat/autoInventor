import * as React from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";
import { Task } from "../tools/composer";

export type BlockProps = {
  task: {
    action: string;
    params: string[];
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
    this.me.parentNode.removeChild(this.me);
  };

  render() {
    const { task: { action, params } } = this.props;
    return (
      <div
        onClick={this.toggle}
        className="list-group-item"
        data-params={params}
        ref={me => {
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
                    let data = "";
                    try {
                      const params = this.me.dataset.params.split(",");
                      data = params
                        .filter((f: string) => ~f.indexOf(p))[0]
                        .split("=")[1];
                    } catch (e) {}
                    return data;
                  })()}
                  onInput={event => {
                    const params = this.me.dataset.params.split(",");

                    const name = params
                      .filter((f: string) => ~f.indexOf(p))[0]
                      .split("=")[0];
                    params.splice(params.indexOf(p), 1);
                    params.push(name + "=" + event.target.value);
                    event.target.parentNode.parentNode.parentNode.dataset.params = params.join(
                      ","
                    );
                  }}
                />
              </ParamContainer>
            ))}
          </ParamsContainer>
        </Collapse>
      </div>
    );
  }
}

const ParamsContainer = styled.div`
  height: auto;
`;

const ParamContainer = styled.div`
  color: grey;
`;

const Param = styled.div`
  display: inline-block;
  margin: 10px;
`;

const ParamInput = styled.input`
  margin-left: 30px;
`;

const Name = styled.div`
  pointer-events: none;
`;

const Remove = styled.button`
  float: right;
  margin-top: -23px;
  border: 1px solid red;
  border-radius: 500px;
  background: none;
  outline: none;
  height: 25px;
  width: 25px;
`;
