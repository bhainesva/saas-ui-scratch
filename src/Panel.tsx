import React, { useState, useMemo } from "react";
import { createContext, useContext } from "react";

const PanelLayoutContext = createContext("");

export const usePanels = <Name extends string>(props: {
  names: Name[];
  initialState: Record<Name[][number], boolean>;
}) => {
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
    } {
      return {
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
      };
    }
    return createPanelHelpers(names);
  }, []);

  return { ...helpers, state };
};

export const usePanelsContext = () => useContext(PanelLayoutContext);

interface PanelLayoutProps {
  children: React.ReactNode;
  panels: string[];
}

function PanelLayout(props: PanelLayoutProps) {
  const { children, ...rest } = props;
  const ctx = usePanelLayout(props);

  return (
    <PanelLayoutContext.Provider value={ctx}>
      {children}
    </PanelLayoutContext.Provider>
  );
}
