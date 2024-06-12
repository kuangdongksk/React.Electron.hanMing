import App from '@renderer/App'
import Main from '@renderer/pages/main'
import { createHashRouter } from 'react-router-dom'

const router = createHashRouter([
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
