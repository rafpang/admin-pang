import React, {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

type ToastContextProps = {
    toastOpen: boolean;
    setToastOpen: Dispatch<SetStateAction<boolean>>;
    toastMessage: string;
    setToastMessage: Dispatch<SetStateAction<string>>;
};

const ToastContext = createContext<ToastContextProps>({
    toastOpen: false,
    setToastOpen: () => {},
    toastMessage: "",
    setToastMessage: () => {},
});

export default function ToastContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    return (
        <ToastContext.Provider
            value={{
                toastOpen,
                setToastOpen,
                toastMessage,
                setToastMessage,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export function useToastContext() {
    return useContext(ToastContext);
}
