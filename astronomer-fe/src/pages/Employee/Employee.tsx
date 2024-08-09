export default function Employee() {
  return (
    <div className="container-sm card mt-5">
      <div className="row p-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select className="form-select">
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Status</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label">Active</label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Number</label>
            <input type="number" className="form-control" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control mb-2" />
            <input type="text" className="form-control mb-2" />
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}
