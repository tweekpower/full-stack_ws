import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useSocket, { EVENT } from "./useSocket";

export default function useCollection(collectionName) {
    const socket = useSocket();
    const [values, setValues] = useState([]);
    const updateValues = useCallback(
        () => {
            socket.emit(EVENT.GET_TABLE, {
                collection: collectionName
            });
        }, [socket, collectionName]
    );
    const onValues = useCallback(
        newValues => {
            setValues(newValues);
        }, []
    );

    useEffect(() => {
        socket.on(collectionName, onValues);
        updateValues();
    }, [socket, onValues, collectionName, updateValues]);
    return [values, updateValues];
}