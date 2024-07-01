export default function ListNode({ data }) {
  console.log(data)
  return (
    <div>
      <span>${data.order}</span>
      <span>${data.id}</span>
    </div>
  )
}
