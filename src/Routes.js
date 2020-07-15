import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UnitList as UnitListView,
  ExpenseList as ExpenseListView,
  BillList as BillListView,
  UnitBillList as UnitBillListView,
  NotificationList as NotificationListView,
  DeclareCharge as DeclareChargeView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        title="داشبورد"
      />
      <RouteWithLayout
        component={ExpenseListView}
        exact
        layout={MainLayout}
        path="/expenses"
        title="هزینه‌ها"
      />
      <RouteWithLayout
        component={UnitListView}
        exact
        layout={MainLayout}
        path="/units"
        title="واحدها"
      />
      <RouteWithLayout
        component={DeclareChargeView}
        exact
        layout={MainLayout}
        path="/declare-charge"
        title="اعلام شارژ"
      />
      <RouteWithLayout
        component={BillListView}
        exact
        layout={MainLayout}
        path="/bills"
        title="صورتحساب"
      />
      <RouteWithLayout
        component={UnitBillListView}
        exact
        layout={MainLayout}
        path="/unit-bills"
        title="صورتحساب"
      />
      <RouteWithLayout
        component={BillListView}
        exact
        layout={MainLayout}
        path="/reports"
        title="گزارشات"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
        title="تنظیمات"
      />
      <RouteWithLayout
        component={NotificationListView}
        exact
        layout={MainLayout}
        path="/notifications"
        title="تابلو اعلانات"
      />
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
        path="/sign-in"
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
