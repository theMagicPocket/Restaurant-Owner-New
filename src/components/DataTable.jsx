const DataTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Customer</th>
          <th className="py-3 px-6 text-left">Menu</th>
          <th className="py-3 px-6 text-left">Total Payment</th>
          <th className="py-3 px-6 text-left">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {/* Row 1 */}
        <tr className="border-b hover:bg-gray-100">
          <td className="py-3 px-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">Hart Hagerty</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">Zemlak, Daniel and Leannon</td>
          <td className="py-3 px-6 text-left">Rs. 1500</td>
          <td className="py-3 px-6 text-left">Pending</td>
        </tr>

        {/* Row 2 */}
        <tr className="border-b hover:bg-gray-100">
          <td className="py-3 px-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">Brice Swyre</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">Carroll Group</td>
          <td className="py-3 px-6 text-left">Rs. 3200</td>
          <td className="py-3 px-6 text-left">Completed</td>
        </tr>

        {/* Row 3 */}
        <tr className="border-b hover:bg-gray-100">
          <td className="py-3 px-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">Marjy Ferencz</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">Rowe-Schoen</td>
          <td className="py-3 px-6 text-left">Rs. 2500</td>
          <td className="py-3 px-6 text-left">Preparing</td>
        </tr>

        {/* Row 4 */}
        <tr className="border-b hover:bg-gray-100">
          <td className="py-3 px-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">Yancy Tear</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">Wyman-Ledner</td>
          <td className="py-3 px-6 text-left">Rs. 5000</td>
          <td className="py-3 px-6 text-left">Completed</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default DataTable;
