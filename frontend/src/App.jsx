import "./App.css"
import { Route, Routes } from "react-router-dom"
import SignIn from "./__root/pages/SignIn"
import RootLayout from "./__root/RootLayout"
import Home from "./__root/pages/Home"
const App = () => {


  return (
    <>
      <Routes>

        <Route path="/sign-in" element={<SignIn />} />

        {/* Private routes */}
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App