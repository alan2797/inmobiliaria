import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { ProtectedRoute, RouteWithLayout } from "components";

import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import {
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Dashboard as DashboardView,
} from "./views";

import { pages } from "rutas";

import { havePermision } from "permisos";
function getRoute() {
  let router = [];
  pages.forEach((menu) => {
    console.log(menu.children);
    if (typeof menu.children === "undefined" || menu.children == null) {
      console.log(menu);
      router.push(
        <ProtectedRoute
          key={"122"}
          component={menu.component}
          exact
          layout={MainLayout}
          path={menu.href}
        />
      );
    }

    if (menu.children != null) {
      menu.children.forEach((r, index) => {
        // if (havePermision(r.id)) {
        router.push(
          <ProtectedRoute
            key={index + "as"}
            component={r.component}
            exact
            layout={MainLayout}
            path={r.href}
          />
        );
        // }

        if (r.route != null) {
          r.route.forEach((rc, index) => {
            // if (havePermision(rc.id)) {
            router.push(
              <ProtectedRoute
                key={index + "cssa"}
                component={rc.component}
                exact
                layout={MainLayout}
                path={rc.href}
              />
            );
            // }
          });
        }
      });
    }
  });
  return router;
}

const Routes = () => {
  return (
    <Switch>
      {getRoute()}
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
