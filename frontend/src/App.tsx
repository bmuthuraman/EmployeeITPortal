import { useState } from "react";
import Employee from "./Employee";
import Admin from "./Admin";

function App() {
  const [role, setRole] = useState<"Employee" | "Admin">("Employee");

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>IT Request Portal</h3>

            <select
              className="form-select w-auto"
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option>Employee</option>
              <option>Admin</option>
            </select>
          </div>

          {role === "Employee" ? <Employee /> : <Admin />}

        </div>
      </div>
    </div>
  );
}

export default App;