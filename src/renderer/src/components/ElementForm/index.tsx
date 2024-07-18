import { ReactNode } from 'react'
import NodeForm from './NodeForm'
import { TElementType } from '@renderer/types/graph/element'
import { useAtom } from 'jotai'
import { formTypeAtom } from '@renderer/stores/layout'
export interface NoteFormProps {}

const FormTypeMap = new Map<TElementType, ReactNode>([['node', <NodeForm />]])

function ElementForm() {
  const [formType] = useAtom(formTypeAtom)

  return <>{FormTypeMap.get(formType)}</>
}
export default ElementForm
