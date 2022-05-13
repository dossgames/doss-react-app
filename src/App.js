import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="881972664289-v0d402h99pa1s8vcqpr10no30dubv4k7.apps.googleusercontent.com">
      <div className="App">
        <h1>Google-Auth</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
