import useCustomNodeRootStyles from './index.style'

function CustomNodeRoot(props: { children?: React.ReactNode }) {
  const { children } = props
  const { styles } = useCustomNodeRootStyles()
  return <div className={styles.root}>{children}</div>
}
export default CustomNodeRoot
