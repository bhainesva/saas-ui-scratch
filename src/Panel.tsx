import React, { useState, useMemo } from "react";
import { createContext } from "react";
import { Button, Box } from "@chakra-ui/react";

interface UsePanelsProps<Name extends string> {
  names: Name[];
  initialState: Record<Name[][number], boolean>;
}

export const usePanels = <Name extends string>(props: UsePanelsProps<Name>) => {
  const { names, initialState } = props;

  const [state, setState] = useState<Record<Name[][number], boolean>>(
    initialState ||
      names.reduce(
        (agg, name) => ({ ...agg, [name]: false }),
        {} as Record<Name[][number], boolean>
      )
  );

  const helpers = useMemo(() => {
    function createPanelHelpers(_parts: Name[] | Readonly<Name[]>): {
      togglePanel<PartStyles extends Name[][number]>(config: PartStyles): void;
      openPanel<PartStyles extends Name[][number]>(config: PartStyles): void;
      closePanel<PartStyles extends Name[][number]>(config: PartStyles): void;
      isOpen<PartStyles extends Name[][number]>(config: PartStyles): boolean;
      PanelsProvider: (props: { children: React.ReactNode }) => React.ReactNode;
      Panel: <PartStyles extends Name[][number]>({
        name,
        children,
        mobileSheet,
      }: {
        name: PartStyles;
        children: React.ReactNode;
        mobileSheet?: boolean;
      }) => React.ReactNode;
      ToggleButton: <PartStyles extends Name[][number]>({
        name,
      }: {
        name: PartStyles;
      }) => React.ReactNode;
    } {
      const toReturn = {
        togglePanel: function <PartStyles extends Name[][number]>(
          part: PartStyles
        ) {
          setState((old) => ({ ...old, [part]: !old[part] }));
        },
        openPanel: function <PartStyles extends Name[][number]>(
          part: PartStyles
        ) {
          setState((old) => ({ ...old, [part]: true }));
        },
        closePanel: function <PartStyles extends Name[][number]>(
          part: PartStyles
        ) {
          setState((old) => ({ ...old, [part]: false }));
        },
        isOpen: function <PartStyles extends Name[][number]>(part: PartStyles) {
          return state[part];
        },
      };
      const PanelsContext = createContext(toReturn);
      return {
        ...toReturn,
        PanelsProvider: (props: { children: React.ReactNode }) => (
          <PanelsContext.Provider value={toReturn}>
            {props.children}
          </PanelsContext.Provider>
        ),
        Panel: (props) => {
          const { name, mobileSheet, ...rest } = props;
          const isOpen = toReturn.isOpen(name);
          const position = mobileSheet
            ? ["fixed", "fixed", "static"]
            : "static";
          const visibility = isOpen ? {} : { display: "none" };
          return (
            <Box
              {...visibility}
              bg="white"
              position={position}
              left={0}
              right={0}
              top={0}
              bottom={0}
              {...rest}
            >
              {props.children}
            </Box>
          );
        },
        ToggleButton: (props) => {
          return (
            <Button onClick={() => toReturn.togglePanel(props.name)}>
              Toggle {props.name}
            </Button>
          );
        },
      };
    }
    return createPanelHelpers(names);
  }, [names, state]);

  return { ...helpers, state };
};
