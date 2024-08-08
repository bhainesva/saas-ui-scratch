import { SaasProvider } from "@saas-ui/react";
import { theme, FiltersProvider, Filter } from "@saas-ui-pro/react";
import { Spacer } from "@chakra-ui/react";
import {
  Page,
  PageHeader,
  Toolbar,
  FiltersAddButton,
  ActiveFiltersList,
} from "@saas-ui-pro/react";
import "./App.css";

function ListPage() {
  const filters = [
    {
      id: "type",
      label: "Contact is lead",
      activeLabel: "Contact",
      value: "lead",
    },
    {
      id: "type",
      label: "Contact is customer",
      activeLabel: "Contact",
      value: "customer",
    },
  ];

  const activeFilters: Filter[] = [
    { id: "type", operator: "is", value: "lead" },
    { id: "type", operator: "isNot", value: "customer" },
  ];

  return (
    <FiltersProvider
      filters={filters}
      onChange={console.log}
      activeFilters={activeFilters}
    >
      <FiltersAddButton />
      <ActiveFiltersList />
    </FiltersProvider>
  );
}

function App() {
  return (
    <SaasProvider theme={theme}>
      <ListPage />
    </SaasProvider>
  );
}

export default App;
