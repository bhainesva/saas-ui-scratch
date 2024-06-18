import { SaasProvider } from "@saas-ui/react";
import { chakra } from "@chakra-ui/react";
import { theme } from "@saas-ui-pro/react";
import "./App.css";
import { SaasFormExample } from "./SaasFormExample";
import { ReactHookFormExample } from "./ReactHookFormExample";

function App() {
  return (
    <SaasProvider theme={theme}>
      <chakra.h2>React Hook Form</chakra.h2>
      <ReactHookFormExample />

      <chakra.h2 mt={10}>Saas</chakra.h2>
      <SaasFormExample />
    </SaasProvider>
  );
}

export default App;
