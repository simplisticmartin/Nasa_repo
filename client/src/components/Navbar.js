/** @format */

export const Navbar = ({ openRegistrationModal, user }) => {
  return (
    <div className="navbar">
      {user ? (
        <div className="navbar-button">{user}</div>
      ) : (
        <div>
          <div className="navbar-button">Login/Switch User</div>
          <div
            className="navbar-button"
            onClick={() => {
              openRegistrationModal(true);
            }}
          >
            Create User
          </div>
        </div>
      )}
    </div>
  );
};
