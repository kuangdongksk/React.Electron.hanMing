import { useState } from 'react'
import { Typography } from 'antd'

const { Text } = Typography
function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Text>Electron v{versions.electron}</Text>
      &nbsp;&nbsp;
      <Text>Chromium v{versions.chrome}</Text>
      &nbsp;&nbsp;
      <Text>Node v{versions.node}</Text>
    </div>
  )
}

export default Versions
