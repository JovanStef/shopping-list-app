import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { AppLayout } from "./components/layouts/AppLayout";
import { HomePage } from "./pages";

import { signInAnonymously } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

function App() {
  signInAnonymously(auth)
    .then(() => {
      console.log("Signed in anonymously! Your app has a valid temporary UID.");
    })
    .catch((error) => {
      console.error("Anonymous auth failed:", error);
    });
  const handleTestConnectivity = async () => {
    try {
      console.log("Testing connection...");

      // Attempt to write a small document

      const docRef = await addDoc(collection(db, "test_connection"), {
        status: "connected",

        time: serverTimestamp(),
      });

      alert(
        `Success! Successfully connected and wrote document ID: ${docRef.id}`,
      );
    } catch (error) {
      console.error("Firestore connection failed: ", error);

      alert(`Error! Connection failed: ${error.message}`);
    }
  };

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
