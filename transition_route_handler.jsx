var TransitionGroup = React.addons.CSSTransitionGroup;
var RouteHandler = ReactRouter.RouteHandler;

var TransitionRouteHandler = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    var router = this.context.router;
    var name = router.getCurrentRoutes().slice(0).reverse()[0].name;
    var routeDirection = router.getCurrentQuery()._animation || 'route-left';

    return (
      <TransitionGroup
        component="div"
        transitionName={routeDirection}>

        <RouteHandler key={name}/>
      </TransitionGroup>
    );
  }
});
