import React, { useRef } from "react";
import { SaasProvider, TableInstance } from "@saas-ui/react";
import { getDataGridFilter, theme, DataGrid, Filter } from "@saas-ui-pro/react";
import "./App.css";
import {
  FiltersProvider,
  FiltersAddButton,
  ActiveFiltersList,
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
        defaultOperator: "contains",
        operators: ["contains"],
        value: [3, 4],
      },
      {
        id: "character",
        label: "Character",
        defaultOperator: "contains",
        operators: ["contains"],
        value: ["c", "d"],
      },
    ],
    []
  );

  const gridRef =
    useRef<TableInstance<{ likes: number; character: string }>>(null);

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
      {
        accessorKey: "character",
        header: "Character",
        filterFn: getDataGridFilter("string"),
      },
    ];
  }, []);

  const onFilter = React.useCallback((filters: Filter[]) => {
    const ffs = filters.map((filter) => {
      return {
        id: filter.id,
        value: {
          value: filter.value,
          operator: filter.operator || "is",
        },
      };
    });
    gridRef.current?.setColumnFilters(ffs);
  }, []);

  const data = React.useMemo(
    () => [
      { likes: 1, character: "a" },
      { likes: 2, character: "b" },
      { likes: 3, character: "c" },
      { likes: 4, character: "d" },
      { likes: 5, character: "e" },
      { likes: 6, character: "f" },
      { likes: 7, character: "g" },
      { likes: 8, character: "h" },
      { likes: 9, character: "i" },
      { likes: 10, character: "j" },
    ],
    []
  );

  return (
    <FiltersProvider filters={filters} onChange={onFilter}>
      <FiltersAddButton />
      <ActiveFiltersList />
      <DataGrid<{ likes: number; character: string }>
        instanceRef={gridRef}
        columns={columns}
        data={data}
      />
    </FiltersProvider>
  );
}

export default App;
