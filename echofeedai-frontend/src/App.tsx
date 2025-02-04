import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "@/routes/Landing";
import NotFound from "./routes/error/NotFound";

// landing
import { loader as landingLoader } from "@/functions/loader/landing.loader";

// auth
import AuthLayout from "./routes/auth/AuthLayout";
import Signup from "./routes/auth/Signup";
import Signin from "./routes/auth/Signin";
import AuthIndex from "./routes/auth/AuthIndex";
import { loader as signinLoader } from "@/functions/loader/auth/signin";
import { action as signinAction } from "@/functions/action/auth/signin.action";
import { loader as signupLoader } from "@/functions/loader/auth/signup";
import { action as signupAction } from "@/functions/action/auth/signup.action";

// home
import { loader as homeLoader } from "@/functions/loader/home";
import { action as logoutAction } from "@/functions/action/auth/logout";
import { AuthErrorBoundary } from "./routes/auth/AuthError";
import HomeLayout from "./routes/home/HomeLayout";
import HomeIndex from "./routes/home/HomeIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    loader: landingLoader,
    children: [],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <AuthErrorBoundary />,
    children: [
      { index: true, element: <AuthIndex /> },
      {
        path: "signup",
        element: <Signup />,
        loader: signupLoader,
        action: signupAction,
      },
      {
        path: "signin",
        element: <Signin />,
        loader: signinLoader,
        action: signinAction,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <HomeIndex />,
        action: logoutAction,
      },
    ],
  },
  {
    path: "*",
    loader: () => {
      throw new Response("Not found", { status: 404 });
    },
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
