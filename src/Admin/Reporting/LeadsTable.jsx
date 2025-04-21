const LeadsTable = ({ data }) => (
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
              Student Intake
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Docs Uploaded
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Payment Pending
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Payment Completed
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Half Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Full Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Sent to RTO
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.agent}>
              <td className="px-6 py-6 whitespace-nowrap  text-md text-gray-900">
                {row.agent}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.studentIntake}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.uploadedDocs}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.paymentPending}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.paymentCompleted}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.halfPayment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.fullPayment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.sentToRTO}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LeadsTable;
