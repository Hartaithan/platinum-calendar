interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
  details?: unknown;
}

export class Logs {
  private static logs: LogEntry[] = [];

  public static get(): LogEntry[] {
    return [...this.logs];
  }

  public static clear(): void {
    this.logs = [];
  }

  public static add(message: string, details?: unknown) {
    const logEntry: LogEntry = {
      id: this.getId(),
      timestamp: new Date(),
      message,
      details,
    };
    this.logs.unshift(logEntry);
  }

  private static getId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
