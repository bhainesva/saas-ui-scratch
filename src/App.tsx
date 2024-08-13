import { useMemo } from "react";
import { SaasProvider } from "@saas-ui/react";
import "./App.css";
import { Spacer } from "@chakra-ui/react";
import {
  FilterOperatorId,
  FilterOperators,
  theme,
  Page,
  PageHeader,
  PageBody,
  Toolbar,
  FiltersProvider,
  FiltersAddButton,
  ActiveFiltersList,
  defaultOperators,
} from "@saas-ui-pro/react";

function App() {
  return (
    <SaasProvider theme={theme}>
      <ListPage />
    </SaasProvider>
  );
}

type MyOperatorIds = FilterOperatorId | "customOperator";

const myOperators: FilterOperators<MyOperatorIds> = [
  ...defaultOperators,
  {
    id: "customOperator" as const,
    label: "custom",
    types: ["enum", "string", "number", "boolean", "date"],
    comparator(value: any, filterValue: any) {
      return value === filterValue;
    },
  },
];

function ListPage() {
  const filters = useMemo(
    () => [
      {
        id: "type",
        label: "Contact is lead",
        activeLabel: "Contact",
        defaultOperator: "is",
        value: "lead",
      } as const,
      {
        id: "type",
        label: "Contact custom lead",
        activeLabel: "Contact",
        defaultOperator: "customOperator",
        value: "lead",
      } as const,
    ],
    []
  );

  return (
    <FiltersProvider operators={myOperators} filters={filters}>
      <Page>
        <PageHeader
          title="Contacts"
          toolbar={
            <Toolbar variant="outline">
              <FiltersAddButton />
              <Spacer />
            </Toolbar>
          }
        />

        <ActiveFiltersList />
        <PageBody></PageBody>
      </Page>
    </FiltersProvider>
  );
}

export default App;
