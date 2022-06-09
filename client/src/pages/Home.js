import { useAuth } from "../util/auth";
import coverImage from '../assets/coffee.png';

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
      <hr />
      <div>
        <p> THE BEST COFFEE FOR THE BEST YOU</p>
      </div>
      <img src={coverImage} alt="coffee background" 
      style={{
        resizeMode: "cover"
        }}/>
    </div>
  );
}
