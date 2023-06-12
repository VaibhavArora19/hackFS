import { Polybase } from "@polybase/client";

export const createDB = () => {
    const db = new Polybase({
        defaultNamespace: 'hackFS-testing'
    });

    return db;
};

export const createTimeBasedJobRecord = 
async (id, contractAddress, functionName, scheduledBy, params, scheduledTime, scheduledAt) => {
    
    const db = createDB();

    ///add a call to create a record in polybase here
    const col = db.collection("timeBasedJob");
    
    const response = await col.create([
        id, contractAddress, functionName, scheduledBy, params, scheduledTime, scheduledAt
    ]);

    return response;
}

export const readTimeBasedJobRecord = async (id) => {
    const db = createDB();

    const response = await db.collection("timeBasedJob").record(id).get();

    return response;
}

export const createCustomJobRecord = async (id, contractAddress, scheduledBy) => {
    const db = createDB();

    const col = db.collection("customLogicJob");

    const response = await col.create([
        id, contractAddress, scheduledBy
    ]);

    return response;
}

export const readCustomBasedJobRecord = async (id) => {
    const db = createDB();

    const response = await db.collection("customLogicJob").record(id).get();

    return response;
}

export const createNewUser = async () => {
    const db = createDB();

    const col = db.collection("users");

    const response = await col.create([
        id
    ]);

    return response;
}