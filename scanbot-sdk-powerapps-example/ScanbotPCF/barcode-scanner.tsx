import * as React from "react";
import ScanbotSDK from "scanbot-web-sdk/ui";

export const BarcodeScanner: React.FC = () => {
    const sdkRef = React.useRef<ScanbotSDK | null>(null);

    React.useEffect(() => {
        const initSDK = async () => {
            if (!sdkRef.current) {
                console.log("Before init");
                sdkRef.current = await ScanbotSDK.initialize({
                    licenseKey: "",
                    enginePath: "./wasm/",
                    onComplete: (error) => {
                        if (error) {
                            console.error("SDK initialization failed: ", error);
                        } else {
                            console.log("SDK initialized successfully");
                        }
                    },
                });
                console.log("After init", sdkRef.current.getLicenseInfo());
            }
        };
        initSDK();
    }, []);

    const handleOpenScanner = async () => {
        const config = new ScanbotSDK.UI.Config.BarcodeScannerScreenConfiguration();

        const result = await ScanbotSDK.UI.createBarcodeScanner(config);
        // Process & present the result as needed
        const format = result?.items[0]?.barcode.format;
        const text = result?.items[0]?.barcode.text;
        alert(`Scanned Barcode:\nFormat: ${format}\nText: ${text}`);
    };

    return (
        <div style={{ fontFamily: "Segoe UI, sans-serif", padding: "20px", textAlign: "center" }}>
            <h2 style={{ color: "#0078d4", marginBottom: "20px" }}>
                Scanbot SDK Barcode Scanner
            </h2>
            <button
                onClick={handleOpenScanner}
                style={{
                    backgroundColor: "#0078d4",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                Open Scanner
            </button>
        </div>
    );
};
