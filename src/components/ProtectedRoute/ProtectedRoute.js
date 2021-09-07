import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, path, handlePathURL, ...props }) {
  !props.loggedIn && handlePathURL(path);
  return (
    <Route>
      {() =>
        // если пользователь еще не зарегистрирован, проверить наличие jwt в localStorage.
        // если jwt есть, то разрешить данный защищенный роут.
        // дальше произойдет проверка данного токена в хуке useEffect компонента App.
        // если эта проверка завершится ошибкой, пользователь будет возвращен на главную страницу.
        props.loggedIn? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    </Route>
  );
}
