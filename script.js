var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var Inbox = React.createClass({
  render: function() {
    return (
      <h2 className="inbox">Inbox Here</h2>
    );
  }
});

var Dashboard = React.createClass({
  componentWillMount: function() {
    console.log('will mount');
  },
  componentDidMount: function() {
    var self = this;
    $(this.getDOMNode()).addClass('new-state');
    $(this.getDOMNode()).addClass('from-right');
    setTimeout(function() {
      $(self.getDOMNode()).removeClass('from-right');
    });
    console.log('did mount');
  },
  render: function() {
    return (
      <h2 className="dashboard">Dashboard</h2>
    );
  }
});


var Calendar = React.createClass({
  mixins: [ tweenState.Mixin ],
  getInitialState: function() {
    return {
      left: 0
    };
  },

  _tweenLeft: function() {
    this.tweenState('left', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 500,
      endValue: 100,
      // endValue: this.state.left === 0 ? 100 : 0
    });
  },

  _getStyle: function() {
    console.log('get style');
    return {
      transform: 'translate(' + this.getTweeningValue('left') + '%, 0)'
    };
  },

  componentWillUnmount: function() {
    this._tweenLeft();
    // $(this.getDOMNode()).addClass('old-state')
    console.log('unmount');
  },

  render: function() {
    return (
      <h2 style={this._getStyle()} onClick={this._tweenLeft} className="calender">Calendar</h2>
    );
  }
});

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><span onClick={this._getTransitionTo('app')} to="app">Dashboard</span></li>
            <li><span onClick={this._getTransitionTo('inbox')} to="inbox">Inbox</span></li>
            <li><span onClick={this._getTransitionTo('calendar')} to="calendar">Calendar</span></li>

          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  },
  _getTransitionTo: function(route) {
    var self = this;
    return function(){
      self.context.router.transitionTo(route);
    }
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
