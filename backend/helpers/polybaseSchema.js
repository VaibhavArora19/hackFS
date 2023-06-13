import { Polybase } from "@polybase/client";

export const createSchema = async () => {

    const db = new Polybase({
        defaultNamespace: 'hackFS-testing'
    });

    const createResponse = await db.applySchema(`
        @public
        collection timeBasedJob {
            id: string;
            contractAddress: string;
            functionName: string;
            scheduledBy: string;
            params: string[];
            scheduledTime: number;
            scheduledAt: number;
            isExecuted: boolean;

            @index(id, scheduledBy);

            constructor(id: string, contractAddress: string, functionName: string, scheduledBy: string,
            params: string[], scheduledTime: number, scheduledAt: number) {
                this.id = id;
                this.contractAddress = contractAddress;
                this.functionName = functionName;
                this.scheduledBy = scheduledBy;
                this.params = params;
                this.scheduledTime = scheduledTime;
                this.scheduledAt = scheduledAt;
                this.isExecuted = false;
            }

            markAsExecuted() {
                this.isExecuted = true;
            }
        }

        @public
        collection customLogicJob {
            id: string;
            contractAddress: string;
            scheduledBy: string;
            executionCount?: number;
            executionTimeline?: number[];

            @index(id);

            constructor(id: string, contractAddress: string, scheduledBy: string) {
                this.id = id;
                this.contractAddress = contractAddress;
                this.scheduledBy = scheduledBy;
            }

            increaseExecutionCount(executionTime: number) {
                this.executionCount += 1;
                this.executionTimeline.push(executionTime);
            }
        }

        @public
        collection users {
            id: string; 
            timeBasedJobs?: timeBasedJob[];
            customLogicJobs?: customLogicJob[];

            @index(id);

            constructor(id: string) {
                this.id = id;
            }

            addNewTimeBasedJob(newJob: timeBasedJob) {
                this.timeBasedJobs.push(newJob);
            }

            addNewCustomLogicJob(newJob: customLogicJob) {
                this.customLogicJobs.push(newJob);
            }
        }

    `)

    return createResponse;
};