import { useMemo } from "react";
import {
  FiltersProvider,
  FiltersAddButton,
  ActiveFiltersList,
  FilterType,
} from "@saas-ui-pro/react";
import "./App.css";

function App() {
  const filters = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        multiple: true,
        type: "enum" as FilterType,
        items: [
          { id: "1", label: "1" },
          { id: "2", label: "2" },
          { id: "3", label: "3" },
          { id: "4", label: "4" },
          { id: "5", label: "5" },
          { id: "6", label: "6" },
          { id: "7", label: "7" },
          { id: "8", label: "8" },
          { id: "9", label: "9" },
          { id: "10", label: "10" },
          { id: "11", label: "11" },
          { id: "12", label: "12" },
          { id: "13", label: "13" },
          { id: "14", label: "14" },
          { id: "15", label: "15" },
          { id: "16", label: "16" },
          { id: "17", label: "17" },
          { id: "18", label: "18" },
          { id: "19", label: "19" },
          { id: "20", label: "20" },
          { id: "21", label: "21" },
          { id: "22", label: "22" },
          { id: "23", label: "23" },
          { id: "24", label: "24" },
          { id: "25", label: "25" },
          { id: "26", label: "26" },
          { id: "27", label: "27" },
          { id: "28", label: "28" },
          { id: "29", label: "29" },
          { id: "30", label: "30" },
        ],
      },
    ],
    []
  );

  return (
    <>
      <FiltersProvider filters={filters}>
        <FiltersAddButton
          // listProps={{
          //   sx: {
          //     "& .chakra-input__group": {
          //       zIndex: "popover",
          //     },
          //   },
          // }}
        />
        <ActiveFiltersList
          // sx={{
          //   "& .chakra-input__group": {
          //     zIndex: "popover",
          //   },
          // }}
        />
      </FiltersProvider>
    </>
  );
}

export default App;
