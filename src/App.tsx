import React, { useRef } from "react";
import { SaasProvider } from "@saas-ui/react";
import { getDataGridFilter, theme, DataGrid } from "@saas-ui-pro/react";
import "./App.css";
import {
  FiltersProvider,
  FiltersAddButton,
  ActiveFiltersList,
  ActiveFilterValueInput,
} from "@saas-ui-pro/react";

function App() {
  return (
    <SaasProvider theme={theme}>
      <ListPage />
    </SaasProvider>
  );
}

function ListPage() {
  const filters = React.useMemo(
    () => [
      {
        id: "likes",
        label: "Likes",
        type: "number",
        defaultOperator: "moreThan",
        operators: ["is", "isNot", "moreThan", "lessThan"],
        value: 3,
      },
    ],
    []
  );

  const gridRef = useRef(null);

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: "likes",
        header: "Likes",
        meta: {
          isNumeric: true,
        },
        filterFn: getDataGridFilter("number"),
      },
    ];
  }, []);

  const onFilter = React.useCallback((filters) => {
    gridRef.current.setColumnFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          value: {
            value: filter.value,
            operator: filter.operator || "is",
          },
        };
      })
    );
  }, []);

  const data = React.useMemo(
    () => [
      { likes: 1 },
      { likes: 2 },
      { likes: 3 },
      { likes: 4 },
      { likes: 5 },
      { likes: 6 },
      { likes: 7 },
      { likes: 8 },
      { likes: 9 },
      { likes: 10 },
    ],
    []
  );

  return (
    <FiltersProvider filters={filters} onChange={onFilter}>
      <FiltersAddButton />
      <ActiveFiltersList />
      <DataGrid instanceRef={gridRef} columns={columns} data={data} />
    </FiltersProvider>
  );
}

export default App;
