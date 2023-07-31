import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Verificăm dacă există un token valid în localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          // Dacă nu există un token valid, redirecționăm către pagina de logare
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
