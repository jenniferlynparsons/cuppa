import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../lib/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import { Provider } from "react-redux";
import store from "../../store";
import ErrorBoundary from "./ErrorBoundary";
// Routes
import NavBar from "../Template/NavBar";
import Footer from "../Template/Footer";
import Landing from "../Landing";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import PrivateRoute from "../Auth/PrivateRoute/PrivateRoute";
import Dashboard from "../Dashboard";
import TeaEditor from "../Tea/TeaEditor";
import TeaCollectionTable from "../Tea/TeaCollectionTable";
import TeaDetails from "../Tea/TeaDetails";
import TeaTypeEditor from "../TeaTypes/TeaTypeEditor";
import TeaTypeCollectionTable from "../TeaTypes/TeaTypeCollectionTable";
// Styles
import "../../common_styles/global.scss";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar data-testid="navbar" />
            <section className="section">
              <div className="App">
                <ErrorBoundary>
                  <Route exact={true} path="/" component={Landing} />
                  <Route exact={true} path="/register" component={Register} />
                  <Route exact={true} path="/login" component={Login} />
                  <Switch>
                    <PrivateRoute
                      exact={true}
                      path="/tea-collection"
                      component={TeaCollectionTable}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/new-tea"
                      component={TeaEditor}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/update-tea/:id"
                      component={TeaEditor}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/tea/:id"
                      component={TeaDetails}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/tea-types"
                      component={TeaTypeCollectionTable}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/new-tea-type"
                      component={TeaTypeEditor}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/update-tea-type/:id"
                      component={TeaTypeEditor}
                    />
                    <PrivateRoute
                      exact={true}
                      path="/dashboard"
                      component={Dashboard}
                    />
                  </Switch>
                </ErrorBoundary>
              </div>
            </section>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
