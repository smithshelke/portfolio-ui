import { DataTable } from "./data-table"
import { columns } from "./columns"
import { getTasks } from "./data"

export default async function TaskBoardPage() {
  const data = await getTasks()

  return (
    <div className="px-4 h-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
