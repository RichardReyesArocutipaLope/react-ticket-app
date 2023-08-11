import { BrowserRouter } from "react-router-dom";
import { RouterPage } from "./pages/RouterPage";

export const TicketApp = () => {
  return (
    <>
      <BrowserRouter>
        <RouterPage />
      </BrowserRouter>
    </>
  );
};
