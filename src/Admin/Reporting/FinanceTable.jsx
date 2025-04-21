const FinanceTable = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-emerald-500">
          <tr>
            <th className="px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">
              Agent
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Received
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Pending
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Payment Plan
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.agent}>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                {row.agent}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${row.totalPrice.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${row.received.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${row.pending.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${row.paymentPlan.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FinanceTable;
