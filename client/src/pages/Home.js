import { useAuth } from '../util/auth';
import './Home.css';

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div className="welcome-container">
      {/* TODO: display logged in user's username */}
      <h1>Welcome {isLoggedIn ? user.username : 'Guest'}!</h1>
      <hr />
    </div>
  );
}
