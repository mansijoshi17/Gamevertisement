import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router"; 
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useEffect, useRef } from "react"; 
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "../context/AuthConext";
import { KlaytnContextProvider } from "../context/KlaytnContext";
import "react-toastify/dist/ReactToastify.css";
import dotenv from "dotenv";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
} 
  
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  useEffect(() => {
    dotenv.config();
  })

  

  return (
    <>
      <Meta title="Home" />
      <Provider store={store}>
        <ToastContainer/>
        <ThemeProvider enableSystem={true} attribute="class">
          <AuthContextProvider> 
            <UserContext.Provider value={{ scrollRef: scrollRef }}>
             <KlaytnContextProvider>
             {pid === "/login" ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
             </KlaytnContextProvider>
            </UserContext.Provider> 
          </AuthContextProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
