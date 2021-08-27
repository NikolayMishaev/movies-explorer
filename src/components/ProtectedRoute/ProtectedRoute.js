import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn || localStorage.getItem("jwt") ? (
          // Если пользователь еще не зарегистрирован, проверить наличие jwt в localStorage.
          // Если jwt есть, то разрешить данный защищенный роут.
          // Дальше произойдет проверка данного токена в хуке useEffect компонента App.
          // Если эта проверка завершится ошибкой, пользователь будет возвращен на главную страницу.
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
