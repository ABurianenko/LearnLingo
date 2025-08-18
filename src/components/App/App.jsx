import { Route, Routes } from "react-router-dom"
import { Home } from "../../pages/Home/Home"
import { Layout } from "../Layout/Layout"
import { PrivateRoute } from "../PrivateRoute"
import { useDispatch, useSelector } from "react-redux"
import { selectIsRefreshing } from "../../redux/auth/selectors"
import { useEffect } from "react"
import { refreshUser } from "../../redux/auth/operations"

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

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
