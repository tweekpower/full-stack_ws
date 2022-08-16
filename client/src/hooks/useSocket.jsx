import { useContext } from "react";
import { SocketContext } from "../contexts/socket";

export const EVENT = {
    GET_TABLE: "getTable"
}

export default function useSocket() {
    const socket = useContext(SocketContext);
    return socket;
}