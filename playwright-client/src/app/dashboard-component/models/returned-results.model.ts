export interface ReturnedResultsModel {
    status: 'passed' | 'failed' | 'skipped';
    browser: string;
    testFile: string;
    testGroup: string;
    testName: string;
    duration: number;
    totalTests: number;
    workerId: number;
    workerDuration: number;
}

export interface SummaryResultsModel {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
}