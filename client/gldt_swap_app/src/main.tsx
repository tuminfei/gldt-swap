import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import "@nfid/identitykit/react/styles.css";

import IdentityKitProvider from "@providers/IdentityKit";
import { AuthProvider } from "@context/auth";
import { colors as themeColors } from "@theme/preset";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: themeColors.surface[2],
          color: themeColors.content,
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 4000,
        },
      }}
    />

    <QueryClientProvider client={queryClient}>
      <IdentityKitProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </IdentityKitProvider>
    </QueryClientProvider>
  </>
);
