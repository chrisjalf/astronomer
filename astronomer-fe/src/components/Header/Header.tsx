export default function Header() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Astronomer</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="/employee" className="nav-link active" aria-current="page">
              Employee
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}
