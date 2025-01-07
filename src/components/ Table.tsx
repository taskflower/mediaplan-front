interface TableProps {
    headers: string[]
    data: Record<string, any>[]
    actions?: (item: any) => React.ReactNode
  }
  
  export const Table: React.FC<TableProps> = ({ headers, data, actions }) => {
    // Desktop view
    const table = (
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead className="bg-gray-900">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 text-left text-sm text-gray-300">
                  {header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-sm text-gray-300">
                  Akcje
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-700">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-sm text-gray-300">
                    {row[header.toLowerCase()]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
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
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            {headers.map((header, headerIndex) => (
              <div key={headerIndex} className="mb-2">
                <span className="text-gray-400 text-sm">{header}:</span>
                <span className="ml-2 text-gray-300">
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