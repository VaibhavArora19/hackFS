const { Polybase } = require("@polybase/client");

const createSchema = async () => {

    const db = new Polybase({
        defaultNamespace: 'hackFS-testing'
    });

    const createResponse = await db.applySchema(`
        @public
        collection timeBasedJob {
            id: string;
            contractAddress: string;
            functionName: string;
            params: string[];
            scheduledTime: number;
            isExecuted: boolean;
        }
    `)
};