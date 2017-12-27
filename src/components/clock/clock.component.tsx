import * as React from "react";
import { selectTime } from "../../state/selectors";
import { selectColor } from "../../state/selectors";
import { createStructuredSelector } from "reselect";
import { tick } from "../../state/actions/time";
import { connect } from "react-redux";

export type ClockProps = {
  time: string;
  color: string;
  tick: Function;
};

const mapStateToProps = createStructuredSelector({
  time: selectTime,
  color: selectColor
});

const mapDispatchToProps = {
  tick
};

@connect(mapStateToProps, mapDispatchToProps)
export class Clock extends React.Component<ClockProps, {}> {
  componentDidMount() {
    this.props.tick();
  }

  render() {
    const { color, time } = this.props;
    return (
      <div style={{ color: color }}>
        <span>{time}</span>
      </div>
    );
  }
}
