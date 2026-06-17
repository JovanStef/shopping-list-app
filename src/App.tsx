import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { AppLayout } from "./components/layouts/AppLayout";
import { HomePage } from "./pages";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/shopping-list" replace />} />
            <Route path="shopping-list" element={<HomePage />} />
            <Route
              path="shopping-list/:shoppingListId"
              element={<HomePage />}
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
