import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function PrivateRoute({ children, ...rest}) {
  const { currentUser } = useAuth();
  // const [exist, setExist] = useState(false);
  // currentUser ? setExist(true) : setExist(false);
  return (
    <Route
      {...rest}
      render={({location}) => 
        currentUser ? (children) : (<Redirect to={{pathname: "/login", state: {from: location}}} />)
      } 
    />
  )
}
