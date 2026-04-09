import { useEffect, useState } from "react";
import API from "./api";
import type { Request } from "./types/Request";

function Admin() {
  const [list, setList] = useState<Request[]>([]);
  const [filters, setFilters] = useState<any>({});

  // 🔹 Load all records (no filters from backend)
  const load = async () => {
    const res = await API.get<Request[]>("/Requests/all");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Client-side filtering
  const filteredList = list.filter((r) => {
    return (
      (!filters.category || r.category === filters.category) &&
      (!filters.priority || r.priority === filters.priority)
    );
  });

  // 🔹 Update status
  const updateStatus = async (id: number, status: string) => {
    await API.put(`/Requests/${id}/status`, `"${status}"`, {
      headers: { "Content-Type": "application/json" }
    });
    load(); // refresh after update
  };

  return (
    <div className="container mt-3">

      {/* 🔹 FILTERS */}
      <div className="card mb-3">
        <div className="card-body d-flex gap-3">

          <select
            className="form-select w-auto"
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value || undefined
              })
            }
          >
            <option value="">All Categories</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Network</option>
            <option>Access</option>
          </select>

          <select
            className="form-select w-auto"
            onChange={(e) =>
              setFilters({
                ...filters,
                priority: e.target.value || undefined
              })
            }
          >
            <option value="">All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>
      </div>

      {/* 🔹 TABLE */}
      <div className="card">
        <div className="card-header">All Requests</div>
        <div className="card-body">

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredList.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.category}</td>
                  <td>{r.priority}</td>
                  <td>
                    <span className="badge bg-secondary">{r.status}</span>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={r.status}
                      onChange={(e) =>
                        updateStatus(r.id!, e.target.value)
                      }
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Admin;