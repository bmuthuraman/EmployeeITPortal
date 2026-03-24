import { useEffect, useState } from "react";
import API from "./api";
import type { Request } from "./types/Request";

function Employee() {
  const [form, setForm] = useState<Request>({} as Request);
  const [list, setList] = useState<Request[]>([]);
  const username = "user1";

  const load = async () => {
    const res = await API.get<Request[]>(`/Requests/user/${username}`);
    setList(res.data);
  };

  const submit = async () => {
    await API.post("/Requests", { ...form, createdBy: username });
    setForm({} as Request);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header">Create Request</div>
        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Description"
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Select Category</option>
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Access</option>
              </select>
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option>Select Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={form.status || ""}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={submit}
          >
            Submit Request
          </button>

        </div>
      </div>

      {/* LIST */}
      <div className="card">
        <div className="card-header">My Requests</div>
        <div className="card-body">

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.category}</td>
                  <td>{r.priority}</td>
                  <td>
                    <span className="badge bg-info">{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Employee;