interface TableProps {
  headers: string[]
  data: Record<string, any>[]
  actions?: (item: any) => React.ReactNode
}

export const Table: React.FC<TableProps> = ({ headers, data, actions }) => {
  // Desktop view
  const table = (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left text-sm text-gray-500 font-medium">
                {header}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-right text-sm text-gray-500 font-medium">
                Akcje
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                  {row[header.toLowerCase()]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Mobile view
  const cards = (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
          {headers.map((header, headerIndex) => (
            <div key={headerIndex} className="mb-2">
              <span className="text-gray-500 text-sm">{header}:</span>
              <span className="ml-2 text-gray-900">
                {item[header.toLowerCase()]}
              </span>
            </div>
          ))}
          {actions && (
            <div className="flex gap-2 mt-3">
              {actions(item)}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="hidden sm:block">{table}</div>
      <div className="sm:hidden">{cards}</div>
    </>
  )
}