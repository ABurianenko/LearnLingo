import { Route, Routes } from "react-router-dom"
import { Home } from "../../pages/Home/Home"
import { Layout } from "../Layout/Layout"
import { PrivateRoute } from "../PrivateRoute"
import { useDispatch, useSelector } from "react-redux"
import { selectIsRefreshing } from "../../redux/auth/selectors"
import { useEffect } from "react"
import { refreshUser } from "../../redux/auth/operations"
import { themeSelect } from "../../redux/theme/selectors"
import { AuthModal } from "../Auth/AuthModal"
import { Teachers } from "../../pages/Teachers/Teachers"
import { Favorites } from "../../pages/Favourites/Favourites"
import { BookingForm } from "../Booking/BookingForm"
import { AuthRequiredModal } from "../Auth/AuthRequiredModal"
import { Toaster } from "react-hot-toast"

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme = useSelector(themeSelect);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  if (isRefreshing) return <p>Loading...</p>;
  
  return (
    <div>
      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />
                    
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/favorites" element={
            <PrivateRoute redirectTo='/login' component={<Favorites />} />
          } />

          <Route path="/register" element={<AuthModal mode="register" />} />
          <Route path="/login" element={<AuthModal mode="login" />} />

          <Route path="*" element={<Home />} />

        </Routes>
        <BookingForm />
        <AuthRequiredModal />
        <Toaster
          containerStyle={{
            top: '20%'
          }}
          toastOptions={{
            style: {
              width: '600px',
              boxShadow: '1px 2px 309px 46px rgba(0,0,0,0.59)',
              WebkitBoxShadow: '1px 2px 309px 46px rgba(0,0,0,0.59)',
              MozBoxShadow: '1px 2px 309px 46px rgba(0,0,0,0.59)',
            }
          }}
        />
      </Layout>
    </div>
  )
}

export default App
