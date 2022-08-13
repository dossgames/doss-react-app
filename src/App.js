import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  return (
    <div style={{display:"flex", alignItems:"center", width:"100vw", height:"100vh", justifyContent:"center"}} >
    <div className="Main-cont" >
      <img src={require("./Assets/logo.png")} className="Logo" alt="Doss Logo"/>
      <h1 style={{lineHeight:0, paddingBottom:"1em", fontWeight:800}} >Doss Wallet</h1>
      
    <GoogleOAuthProvider clientId="881972664289-v0d402h99pa1s8vcqpr10no30dubv4k7.apps.googleusercontent.com">
      <div className="App">
        {/* <h1>Google-Auth</h1> */}
        {/* <GoogleLogin
          onSuccess={onGOuthSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
          ux_mode="redirect"
          login_uri="http://f378-106-51-78-204.ngrok.io/test-api/ValidateIdToken/"
        /> */}
        <LoginPage />
        <br/>
        <p style={{lineHeight:1.8, fontWeight:600 }} >
          Play Unlimited Games. <br/>
          Single click Google Auth Signin. <br/>
          Play & Earn tokens.
        </p>
      </div>
    </GoogleOAuthProvider>
    </div>
    </div>
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
      <button className="Gauth-btn" onClick={() => login()}> <img src={require("./Assets/google_icon.png")} style={{height:"10%", width:"10%"}} alt="Google"/> SIGN IN WITH GOOGLE</button>
    </div>
  );
}

export default App;
