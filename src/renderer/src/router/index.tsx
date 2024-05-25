import App from '@renderer/App'
import Main from '@renderer/pages/main/Main'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/main',
    element: <Main />
  }
])

export default router
