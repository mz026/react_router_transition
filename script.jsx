var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var TransitionGroup = React.addons.CSSTransitionGroup;

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
    return (
      <div className="route-handler">
        <h2>Dashboard Details</h2>
        <TransitionLink to="app" animation="route-right"> back to dash</TransitionLink>
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
    var router = this.context.router;
    var name = router.getCurrentRoutes();
    var routeDirection = router.getCurrentQuery()._animation || 'route-left';

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

        <TransitionRouteHandler />
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
