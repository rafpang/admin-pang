import React, {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

type AttendanceContextProps = {
    nightAttendanceAddDelta: number;
    nightAttendanceMinusDelta: number;
    matineeAttendanceAddDelta: number;
    matineeAttendanceMinusDelta: number;

    setNightAttendanceAddDelta: Dispatch<SetStateAction<number>>;
    setNightAttendanceMinusDelta: Dispatch<SetStateAction<number>>;
    setMatineeAttendanceAddDelta: Dispatch<SetStateAction<number>>;
    setMatineeAttendanceMinusDelta: Dispatch<SetStateAction<number>>;
};

const AttendanceContext = createContext<AttendanceContextProps>({
    nightAttendanceAddDelta: 0,
    nightAttendanceMinusDelta: 0,
    matineeAttendanceAddDelta: 0,
    matineeAttendanceMinusDelta: 0,

    setNightAttendanceAddDelta: () => {},
    setNightAttendanceMinusDelta: () => {},
    setMatineeAttendanceAddDelta: () => {},
    setMatineeAttendanceMinusDelta: () => {},
});

export default function AttendanceContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [nightAttendanceAddDelta, setNightAttendanceAddDelta] =
        useState<number>(0);
    const [nightAttendanceMinusDelta, setNightAttendanceMinusDelta] =
        useState<number>(0);
    const [matineeAttendanceAddDelta, setMatineeAttendanceAddDelta] =
        useState<number>(0);
    const [matineeAttendanceMinusDelta, setMatineeAttendanceMinusDelta] =
        useState<number>(0);

    return (
        <AttendanceContext.Provider
            value={{
                nightAttendanceAddDelta,
                nightAttendanceMinusDelta,
                matineeAttendanceAddDelta,
                matineeAttendanceMinusDelta,
                setNightAttendanceAddDelta,
                setNightAttendanceMinusDelta,
                setMatineeAttendanceAddDelta,
                setMatineeAttendanceMinusDelta,
            }}
        >
            {children}
        </AttendanceContext.Provider>
    );
}

export function useAttendanceContext() {
    return useContext(AttendanceContext);
}
