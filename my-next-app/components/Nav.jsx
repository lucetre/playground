import { NavLink } from '.';

export { Nav };

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                <NavLink href="/discord" className="nav-item nav-link">Discord</NavLink>
                <NavLink href="/new" className="nav-item nav-link">New</NavLink>
            </div>
        </nav>
    );
}