/** @jsx React.DOM */

var ScaleValue = React.createClass({
  handleClick: function() {
    this.props.onClick(this.props.key);
  },
  render: function() {
    var classes = ['nps-Scale-value'];
    if (this.props.selected) {
      classes.push('nps-is-selected');
    }
    return (<div className={classes.join(' ')} onClick={this.handleClick}></div>);
  }
});

var Scale = React.createClass({
  getInitialState: function() {
    return {value: null};
  },
  handleValueClick: function(value) {
    this.setState({value: value});
    this.props.onChange(value);
  },
  render: function() {
    var scaleValues =  [0,1,2,3,4,5,6,7,8,9,10].map(function(i) {
      var selected = (this.state.value !== null && this.state.value >= i);
      return (
        <ScaleValue selected={selected} key={i} onClick={this.handleValueClick} />
      );
    }, this);

    return (
      <div className="nps-Scale">
        <div className="nps-Scale-ratings">
          {scaleValues}
        </div>
        <div className="nps-cf">
          <div className="nps-Survey-hint nps-Survey-hint--notLikely">
            Not at all likely</div>
          <div className="nps-Survey-hint nps-Survey-hint--likely">
            Extremely likely</div>
        </div>
      </div>
    );
  }
});

var Feedback = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  render: function() {
    return (
      <div className="nps-Survey-feedback">
        <textarea
          className="nps-Survey-feedbackText"
          placeholder="What could we do to improve?"
          value={this.state.value}
          onChange={this.handleChange}></textarea>
      </div>
    );
  }
});

var Survey = React.createClass({
  getDefaultProps: function() {
    return {theme: 'pink', skin: 'dialog'};
  },
  getInitialState: function() {
    return {rating: null};
  },
  handleRatingChange: function(rating) {
    this.setState({rating: rating});
  },
  handleSubmit: function() {
    console.log('Submit', this.state.rating, this.refs.feedback.state.value);
  },
  handleClose: function() {
    console.log('Close');
  },
  render: function() {
    var classes = [
      'nps-Survey',
      'nps-Survey--' + this.props.theme,
      'nps-Survey--' + this.props.skin,
    ].join(' ');

    var buttons;
    if (this.state.rating !== null) {
      buttons = <button className="nps-Button nps-Survey-submit" onClick={this.handleSubmit}>Submit</button>;
    }

    var feedback;
    if (this.state.rating !== null) {
      feedback = <Feedback ref="feedback" />;
    }

    return (
      <div className={classes}>
        <button className="nps-Survey-closeIcon" onClick={this.handleClose}>&#x2715;</button>
        <div className="nps-Survey-body">
          <div className="nps-Survey-rating">
            <div className="nps-Survey-question">
              How likely are you to recommend us to your friends and colleagues?
            </div>
            <Scale ref="rating" onChange={this.handleRatingChange} />
            {feedback}
          </div>
        </div>
        <div className="nps-Survey-poweredBy">
          Powered by <a href="http://www.satismeter.com" target="_blank">SatisMeter</a>
        </div>
        <div className="nps-Survey-buttons">
          {buttons}
        </div>
      </div>
    );
  }
});

React.renderComponent(
  <Survey theme="blue" />,
  document.body
);
