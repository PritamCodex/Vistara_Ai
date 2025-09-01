import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import Chatbot from './Chatbot';

const MainApp = ({ onBack }) => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const fileInputRef = useRef(null);
    const appContainerRef = useRef(null);
    const [currencyPair, setCurrencyPair] = useState('');
    const [timeframe, setTimeframe] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                setImage(base64Data);
                setAnalysisResult(null);
            };
            reader.onerror = () => {
                setModalMessage("Error reading the file.");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setAnalysisResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePaste = (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Data = reader.result.split(',')[1];
                    setImage(base64Data);
                    setAnalysisResult(null);
                };
                reader.readAsDataURL(file);
                event.preventDefault();
                return;
            }
        }
    };

    useEffect(() => {
        const container = appContainerRef.current;
        if (container) {
            container.addEventListener('paste', handlePaste);
        }
        return () => {
            if (container) {
                container.removeEventListener('paste', handlePaste);
            }
        };
    }, []);

    const handleAnalyze = async () => {
        if (!image) {
            setModalMessage("Please upload a chart screenshot or paste an image.");
            return;
        }
        
        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const prompt = `You are an expert financial market analyst. Analyze the following TradingView chart screenshot for the forex pair ${currencyPair || 'unknown'} on the ${timeframe || 'an unspecified'} timeframe. Provide a concise trade recommendation. Your analysis should be based on a combination of ICT (Inner Circle Trader) concepts, trend and Moving Averages (EMAs), and volumetric analysis.

            A valid trade must have a risk-to-reward ratio of 1:2 or higher.

            If a valid trade is found, your response must be a single JSON object with the following keys:
            - "entry": A string representing the specific price level or range for a potential trade entry.
            - "stopLoss": A string representing the specific price level for a stop-loss.
            - "target": A string representing the specific price level for a profit target.
            - "riskToReward": A string with the calculated risk-to-reward ratio (e.g., "1:2.5").
            - "reasoning": A string with a brief explanation (2-3 sentences) for the trade idea, citing the key factors from the analysis.

            If no trade with a risk-to-reward ratio of 1:2 or higher is found, your response must be a single JSON object with only one key: "reasoning", with the value set to "No possible trade."`;

            const payload = {
                contents: [{
                    role: "user",
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: "image/png",
                                data: image
                            }
                        }
                    ]
                }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "OBJECT",
                        properties: {
                            "entry": { "type": "STRING" },
                            "stopLoss": { "type": "STRING" },
                            "target": { "type": "STRING" },
                            "riskToReward": { "type": "STRING" },
                            "reasoning": { "type": "STRING" }
                        },
                        "propertyOrdering": ["entry", "stopLoss", "target", "riskToReward", "reasoning"]
                    }
                }
            };

            const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            let response;
            let retries = 0;
            const maxRetries = 5;
            let delay = 1000;

            while (retries < maxRetries) {
                try {
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.status === 429) {
                        retries++;
                        delay *= 2;
                        await new Promise(res => setTimeout(res, delay));
                        continue;
                    }

                    if (!response.ok) {
                        throw new Error(`API error: ${response.statusText}`);
                    }

                    break;
                } catch (error) {
                    console.error("Fetch failed:", error);
                    retries++;
                    delay *= 2;
                    if (retries >= maxRetries) {
                        throw error;
                    }
                    await new Promise(res => setTimeout(res, delay));
                }
            }

            if (!response) {
                throw new Error("Failed to get a response from the API after multiple retries.");
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const jsonText = result.candidates[0].content.parts[0].text;
                const parsedJson = JSON.parse(jsonText);
                setAnalysisResult(parsedJson);

            } else {
                setModalMessage("Analysis failed: Could not retrieve a valid response from the AI.");
            }

        } catch (error) {
            console.error('An error occurred during analysis:', error);
            setModalMessage("An error occurred during analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={appContainerRef} className="min-h-screen bg-[#0E1020] text-gray-100 p-8 flex flex-col md:flex-row items-center justify-center font-sans transition-colors duration-300">
            <div className="w-full max-w-7xl bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-8 flex flex-col md:flex-row md:space-x-8 md:space-y-0 transition-colors duration-300 relative">
                
                <div className="flex-1 space-y-6">
                    <header className="text-center">
                        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                        </button>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                            AI Trading Chart Analyzer
                        </h1>
                        <p className="text-lg text-gray-400">
                            Upload a TradingView screenshot, or **paste an image** to get a detailed AI analysis.
                        </p>
                    </header>
                    <div className="text-center mt-4 p-4 rounded-xl bg-gray-800 border border-gray-700">
                        <p className="text-green-400 font-bold">Unlimited Analyses</p>
                    </div>

                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center transition-colors duration-300 hover:border-blue-500 cursor-pointer">
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4v-1a4 4 0 014-4h4l1.5-3.5L13 4l1.5 3.5H21a4 4 0 014 4v1a4 4 0 01-4 4h-4m-6 0l-4 4"></path>
                            </svg>
                            <span className="text-lg font-semibold text-gray-400">
                                {image ? "Image uploaded" : "Click to upload a chart screenshot"}
                            </span>
                            <p className="text-sm text-gray-500">
                                PNG, JPG or JPEG (max 10MB)
                            </p>
                        </label>
                        <input
                            ref={fileInputRef}
                            id="file-upload"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="currency-pair" className="block text-sm font-medium text-gray-400 mb-1">
                                Currency Pair (e.g., USDCHF)
                            </label>
                            <input
                                type="text"
                                id="currency-pair"
                                value={currencyPair}
                                onChange={(e) => setCurrencyPair(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-100 transition-colors"
                                placeholder="e.g., USDCHF"
                            />
                            {currencyPair && (
                                <button
                                    onClick={() => setCurrencyPair('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    style={{ top: '1.25rem' }}
                                >
                                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-400 mb-1">
                                Timeframe (e.g., 4H, 1D)
                            </label>
                            <input
                                type="text"
                                id="timeframe"
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-100 transition-colors"
                                placeholder="e.g., 4H"
                            />
                            {timeframe && (
                                <button
                                    onClick={() => setTimeframe('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    style={{ top: '1.25rem' }}
                                >
                                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {image && (
                        <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-700">
                            <img src={`data:image/png;base64,${image}`} alt="Uploaded chart" className="w-full h-auto object-cover" />
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={handleClearImage}
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg"
                                    title="Clear image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || !image}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        {isLoading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{isLoading ? "Analyzing..." : "Analyze Chart"}</span>
                    </button>

                    {analysisResult && (
                        <div className="bg-gray-800 rounded-xl p-6 shadow-inner border border-gray-700 transition-colors duration-300">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-4">
                                AI Analysis
                            </h2>
                            {analysisResult.reasoning === "No possible trade." ? (
                                <div className="text-center text-lg font-semibold text-red-400">
                                    {analysisResult.reasoning}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-200">Entry:</h3>
                                        <p className="text-gray-300">{analysisResult.entry}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-200">Stop-Loss:</h3>
                                        <p className="text-gray-300">{analysisResult.stopLoss}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-200">Target:</h3>
                                        <p className="text-gray-300">{analysisResult.target}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-200">Risk-to-Reward:</h3>
                                        <p className="text-gray-300">{analysisResult.riskToReward}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-200">Reasoning:</h3>
                                        <p className="text-gray-300">{analysisResult.reasoning}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="flex-1 min-h-[500px] mt-8 md:mt-0">
                    <Chatbot analysisResult={analysisResult} />
                </div>
            </div>
            {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}
        </div>
    );
};

export default MainApp;
