import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from '@pages/index';

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
}

export default routes;