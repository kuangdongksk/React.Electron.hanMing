import App from '@renderer/App'
import Main from '@renderer/pages/main'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/main',
        element: <Main />
      }
    ]
  }
])

export default router
