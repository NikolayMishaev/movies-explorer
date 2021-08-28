import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        // если пользователь еще не зарегистрирован, проверить наличие jwt в localStorage.
        // если jwt есть, то разрешить данный защищенный роут.
        // дальше произойдет проверка данного токена в хуке useEffect компонента App.
        // если эта проверка завершится ошибкой, пользователь будет возвращен на главную страницу.
        props.loggedIn || localStorage.getItem("jwt") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
