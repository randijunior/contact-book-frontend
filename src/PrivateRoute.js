import {
    Route,
    Redirect
  } from "react-router-dom";

  import Auth from './Auth';


function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
        {...rest}
        render = {props => Auth.getAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect 
            to={{
                pathname : "/login",
                state: {from: props.location}
            }}
            />
        )}
        
        
        />
    )
}

export default PrivateRoute;