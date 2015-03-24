var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var TransitionGroup = React.addons.CSSTransitionGroup;
var ROUTE_DIRECTION = "route-left";

var Inbox = React.createClass({
  render: function() {
    return (
      <h2 className="route-handler inbox">Inbox Here</h2>
    );
  }
});

var Dashboard = React.createClass({
  render: function() {
    return (
      <div className="route-handler">
        <h2 className="dashboard">Dashboard</h2>
        
        <Link to="dashboard-detail">dashboard details</Link>
      </div>
    );
  }
});

var DashboardDetail = React.createClass({
  render: function() {
    ROUTE_DIRECTION = "route-right";
    return (
      <div className="route-handler">
        <h2>Dashboard Details</h2>
        <Link to="app">back to dashboard</Link>
      </div>
    );
  }
});


var Calendar = React.createClass({
  render: function() {
    return (
      <h2 className="route-handler calender">Calendar</h2>
    );
  }
});

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function () {
    var name = this.context.router.getCurrentRoutes();
    console.log(name);

    var transitionName = ROUTE_DIRECTION;
    ROUTE_DIRECTION = "route-left";

    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <TransitionGroup component="div" transitionName={transitionName}>
          <RouteHandler key={name}/>
        </TransitionGroup>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar}/>
    <Route name="dashboard-detail" handler={DashboardDetail}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
