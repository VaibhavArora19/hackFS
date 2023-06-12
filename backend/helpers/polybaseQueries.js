import { Polybase } from "@polybase/client";

export const createDB = () => {
    const db = new Polybase({
        defaultNamespace: 'hackFS-testing'
    });

    return db;
};

export const createJobRecord = async () => {
    
    const db = createDB();

    ///add a call to create a record in polybase here

}