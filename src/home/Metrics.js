import React from "react";
import { DATADOG_DASHBOARD_URL } from "../others/constants";

const Metrics = () => {
    return (
        <div>
            <iframe width={1900}
                    height={1200}
                    src={DATADOG_DASHBOARD_URL}>
            </iframe>
        </div>
    );
}

export {
    Metrics
}
