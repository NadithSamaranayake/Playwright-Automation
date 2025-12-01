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

export interface TestApiResponse{
    message: string;
    output: string;
}