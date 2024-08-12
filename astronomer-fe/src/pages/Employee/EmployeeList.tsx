import { useContext } from "react";

import { EmployeeContext } from "../../store/EmployeeContext";

export default function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  return (
    <div className="container my-5">
      <div className="table-responsive">
        {JSON.stringify(employees)}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alibaba</td>
              <td>IT</td>
              <td>Active</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button type="button" className="btn btn-primary">
                    View
                  </button>
                  <button type="button" className="btn btn-warning">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Boost</td>
              <td>Finance</td>
              <td>Inactive</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button type="button" className="btn btn-primary">
                    View
                  </button>
                  <button type="button" className="btn btn-warning">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
