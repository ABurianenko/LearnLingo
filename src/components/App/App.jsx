import { Route, Routes } from "react-router-dom"
import { Home } from "../../pages/Home/Home"
import { Layout } from "../Layout/Layout"
import { PrivateRoute } from "../PrivateRoute"
import { useDispatch, useSelector } from "react-redux"
import { selectIsRefreshing } from "../../redux/auth/selectors"
import { useEffect } from "react"
import { refreshUser } from "../../redux/auth/operations"
import { themeSelect } from "../../redux/theme/selectors"
import { initTheme } from "../../redux/theme/operations"

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme = useSelector(themeSelect);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

  useEffect(() => {
    dispatch(initTheme())
  })

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  if (isRefreshing) return <p>Loading...</p>;
  
  return (
    <div>
      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />
          
          
          {/* <Route path="/teachers" element={<Teachers />} />
          <Route path="/favourites" element={
            <PrivateRoute redirectTo='/login' component={<Favourites />} />
          } />

          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Home />} /> */}

        </Routes>

      </Layout>
    </div>
  )
}

export default App
