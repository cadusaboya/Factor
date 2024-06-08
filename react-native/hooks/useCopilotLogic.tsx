import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useCopilot } from "react-native-copilot";

export const useCopilotLogic = () => {
    const [lastEvent, setLastEvent] = useState<string | null>(null);
    const { start, copilotEvents } = useCopilot();

    // Listen to the Copilot events
    useEffect(() => {
        copilotEvents.on("stepChange", (step: any) => {
            setLastEvent(`stepChange: ${step.name}`);
        });
        copilotEvents.on("start", () => {
            setLastEvent(`start`);
        });
        copilotEvents.on("stop", () => {
            setLastEvent(`stop`);
        });
    }, [copilotEvents]);

    // Use this view for the steps
    const CustomCopilotView = (props: { copilot?: any; children: JSX.Element }) => {
        return <View {...props.copilot}>{props.children}</View>;
    };

    // Start the Copilot
    const StartCopilot = () => {
        start();
    };

    return { lastEvent, CustomCopilotView, StartCopilot };
};