import { HTML, Rect, Text } from '@antv/g6-extension-react'
import { INodeData } from '@renderer/interface/components/node'
import CustomNodeRoot from '../components/customNodeRoot'
import { useState } from 'react'
import CustomText from '../components/customText'

export interface IPlainNodeProps {
  data: INodeData
}

function PlainNode(props: IPlainNodeProps) {
  const { data } = props

  return (
    <CustomNodeRoot>
      <CustomText text={data.id} />
      <CustomText text={data.content} />
      <HTML
        innerHTML={`
        <div
          style={{
            width: '100px',
            height: '100px',
            background: 'red'
          }}
        ></div>
        `}
      ></HTML>
    </CustomNodeRoot>
  )
}

export default PlainNode
