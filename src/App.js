import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

const backendUrl = "https://tools.doss.games";
const backendEndpoint = "/test-api/ValidateIdToken";

function App() {
  return (
    <GoogleOAuthProvider clientId="881972664289-v0d402h99pa1s8vcqpr10no30dubv4k7.apps.googleusercontent.com">
      <div className="App">
        <h1>Google-Auth</h1>
        {/* <GoogleLogin
          onSuccess={onGOuthSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
          ux_mode="redirect"
          login_uri="http://f378-106-51-78-204.ngrok.io/test-api/ValidateIdToken/"
        /> */}
        <LoginPage />
      </div>
    </GoogleOAuthProvider>
  );
}

function LoginPage() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
    flow: "auth-flow",
    ux_mode: "redirect",
    redirect_uri: "https://tools.doss.games/test-api/ValidateIdToken/",
  });

  return (
    <div>
      <button onClick={() => login()}>Login with google✌</button>
    </div>
  );
}

var onGOuthSuccess = (credentialResponse) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: credentialResponse.credential }),
  };
  fetch(backendUrl + backendEndpoint, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      window.postMessage(
        JSON.stringify({
          source: "doss",
          type: "subscribe",
          eventName: "success",
          data: {
            authKey: data.accessToken,
            refKey: data.refreshToken,
            isWallet: data.walletExists ? "true" : "false",
          },
        }),
        "*"
      );

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export default App;
