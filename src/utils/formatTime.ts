import { Timestamp } from "firebase/firestore";

const formatTime = (time: Timestamp) =>
    new Date(time.toDate().getTime()).toLocaleString();

export default formatTime;
