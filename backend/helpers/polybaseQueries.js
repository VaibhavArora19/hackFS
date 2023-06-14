import { Polybase } from "@polybase/client";

export const createDB = () => {
    const db = new Polybase({
        defaultNamespace: 'hackFS-testing2'
    });

    return db;
};

export const createTimeBasedJobRecord = async (id, contractAddress, ABI, functionName, scheduledBy, params, scheduledTime, scheduledAt) => {
    
    const db = createDB();

    ///add a call to create a record in polybase here
    const col = db.collection("timeBasedJob");
    
    const response = await col.create([
        id, contractAddress, ABI, functionName, scheduledBy, params, scheduledTime, scheduledAt
    ]);

    return response;
}

export const readTimeBasedJobRecord = async (id) => {
    const db = createDB();

    const response = await db.collection("timeBasedJob").record(id).get();

    return response;
}

export const readTimeBasedJobRecordByAddress = async (address) => {
    const db = createDB();

    const response = await db.collection("timeBasedJob").where("scheduledBy", "==", address).get();

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

export const createNewUser = async (id) => {
    const db = createDB();

    const col = db.collection("users");

    const response = await col.create([
        id
    ]);

    return response;
}

export const getTimeBasedReadInstance = (id) => {
    const db = createDB();
    const instance = db.collection("timeBasedJob").record(id).get();

    return instance;
}

export const markJobAsExecuted = async (id) => {
    const db = createDB();

    const response = await db.collection("timeBasedJob").record(id).call("markAsExecuted");
    return response;
}

export const addTimeBasedJobReference = async (userId, timeBasedJobId) => {
    const db = createDB();

    const response = await db.collection("users").record(userId).call("addNewTimeBasedJob", [db.collection("timeBasedJob").record(timeBasedJobId)]);
    console.log("rrr", response.data);
    return response;
}

export const getUserInfo = async (userAddress) => {
    const db = createDB();

    const response = await db.collection("users").record(userAddress).get();

    return response;
}