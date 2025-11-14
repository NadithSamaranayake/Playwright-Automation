export interface CreateTestCaseModel{
    url: string;
    testName: string;
    headless: boolean;
    expectedResult: string;
    description: string;
    slowmo?: number;
}