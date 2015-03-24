/**
 * Transition link
 * wrapper to assign animation when linking
 * usage:
 *
 * <TransitionLink to="app" animation="route-right"> back to dash</TransitionLink>
 */

var TransitionLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <a onClick={this._handleClick}>{ this.props.children }</a>
    );
  },

  _handleClick: function() {
    this.context.router.transitionTo(
      this.props.to,
      null,
      { _animation: this.props.animation });
  }
});
