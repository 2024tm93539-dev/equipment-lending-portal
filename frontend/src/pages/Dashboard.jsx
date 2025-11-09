export default function Dashboard() {
  const role = localStorage.getItem("role");
  return (
    <div>
      <h2>Welcome to Equipment Portal</h2>
      <p>Logged in as <b>{role}</b></p>
    </div>
  );
}

