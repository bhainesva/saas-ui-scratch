import React from "react";
import { SaasProvider } from "@saas-ui/react";
import {
  theme,
  FilterItem,
  Filter,
  FiltersAddButton,
  ActiveFiltersList,
  FiltersProvider,
} from "@saas-ui-pro/react";
import "./App.css";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverCloseButton,
  useDisclosure,
  Badge,
  BadgeProps,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

const StatusBadge = (props: BadgeProps) => (
  <Badge
    boxSize="12px"
    padding="0"
    borderRadius="full"
    variant="outline"
    bg="transparent"
    borderWidth="2px"
    boxShadow="none"
    {...props}
  />
);

function App() {
  const { onToggle } = useDisclosure();

  const filters = React.useMemo<FilterItem[]>(
    () => [
      {
        id: "status",
        label: "Status",
        type: "enum",
        icon: <StatusBadge borderColor="currentColor" />,
        items: [
          {
            id: "new",
            label: "New",
            icon: <StatusBadge borderColor="blue.400" />,
          },
          {
            id: "active",
            label: "Active",
            icon: <StatusBadge borderColor="green.400" />,
          },
        ],
      },
      {
        id: "type",
        label: "Contact is lead",
        activeLabel: "Contact",
        type: "enum",
        operators: ["is", "isNot"],
        icon: <span>icon</span>,
        value: "lead",
      },
    ],
    []
  );

  const onFilter = (filters: FilterItem[]) => {
    console.log("Filters: ", filters);
  };

  const defaultFilters: Filter[] = [
    { id: "status", operator: "isNot", value: "new" },
  ];

  return (
    <SaasProvider theme={theme}>
      <FiltersProvider
        filters={filters}
        onChange={onFilter}
        defaultFilters={defaultFilters}
      >
        <Popover>
          <PopoverTrigger>
            <Button onClick={onToggle}>Open Filters Modal</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverBody>
              <FiltersAddButton />
              <ActiveFiltersList />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </FiltersProvider>
    </SaasProvider>
  );
}

export default App;
