import * as React from "react";
import styled from "styled-components";
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

  render() {
    const { task: { action, params } } = this.props;
    return (
      <div
        onClick={this.toggle}
        className="list-group-item"
        data-params={params}
      >
        <div className="name">{action}</div>
        {this.state.expanded && (
          <ParamsContainer>
            {params.map((p, i) => (
              <ParamContainer key={i}>
                <Param>{p}</Param>
                <ParamInput
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onInput={event => {
                    const params = event.target.parentNode.parentNode.parentNode.dataset.params.split(
                      ","
                    );

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
        )}
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
