import { SaasProvider } from "@saas-ui/react";
import { theme } from "@saas-ui-pro/react";
import "./App.css";

function App() {
  return (
    <SaasProvider theme={theme}>
      <div>hi</div>
    </SaasProvider>
  );
}

export default App;
