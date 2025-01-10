import { Logs } from "@/utils/logs";
import type { FC } from "react";

const LogsPage: FC = async () => {
  const logs = Logs.get();
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {logs.length === 0 && (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert">
            <p className="font-bold">No logs found</p>
            <p>There are currently no logs to display.</p>
          </div>
        )}
        {logs.length > 0 &&
          logs.map((log) => (
            <div key={log.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-2">
                  <span className="text-sm text-gray-500">
                    {log.timestamp.toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {log.timestamp.toISOString()}
                  </span>
                </div>
                <span className="text-sm font-mono bg-gray-100 rounded px-2 py-1">
                  {log.id}
                </span>
              </div>
              <p className="mt-2 text-lg">{log.message}</p>
              {log.details !== undefined && (
                <pre className="mt-2 bg-gray-50 p-2 rounded overflow-auto max-h-40 text-sm">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default LogsPage;
