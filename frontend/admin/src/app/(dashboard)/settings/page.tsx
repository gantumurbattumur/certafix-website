export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Business and application settings</p>

      <div className="mt-8 space-y-6">
        {/* Business Info */}
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                defaultValue="CertaFix"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                defaultValue="(555) 123-4567"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                defaultValue="info@certafix.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Area</label>
              <input
                type="text"
                defaultValue="Greater Metro Area"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button className="mt-4 rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            Save Changes
          </button>
        </div>

        {/* Password Change */}
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button className="mt-4 rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
