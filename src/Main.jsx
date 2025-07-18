import { useRef, useState } from "react";

export default function Main() {
    const refe = useRef(null);
    const [qrUrl, setQrUrl] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    function generateQrCode() {
        const text = refe.current.value;
        if (!text.trim()) return;

        const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
        setQrUrl(url);
        refe.current.value = "";
        setTimeout(() => {
            setShowSuccess(true);
            setTimeout(()=>setShowSuccess(false),3000)
        }, 500);
    }

    return (
        <main className="border-2 border-white mt-16 drop-shadow-2xl rounded-2xl drop-shadow-black w-[30rem] min-h-[32rem] bg-white">
            <div className="flex justify-center items-center flex-col mt-5">
                <h1 className="text-2xl font-extrabold mt-5">QR Code Generator</h1>

                <div className="flex flex-row gap-10">
                    <input
                        type="text"
                        placeholder="Enter URL or Text"
                        ref={refe}
                        className="border-b-4 border-black focus:border-b-4 py-2 px-2 mt-5"
                    />
                    <button
                        onClick={generateQrCode}
                        className="bg-black cursor-pointer hover:scale-105 duration-300 rounded-xl text-white font-bold p-3 mt-5"
                    >
                        Generate
                    </button>
                </div>

                {qrUrl && (
                    <div className="mt-10 mb-5">
                        <img src={qrUrl} alt="QR Code" />
                    </div>
                )}

                {showSuccess && (
                    <div className="flex justify-center items-center rounded-2xl bg-green-400 p-6 w-[90%] border-4 border-black shadow-2xl mt-5 transition-opacity duration-500 opacity-100 animate-fadeOut">
                        <h1 className="font-extrabold text-center">
                        QR code has been generated successfully
                        </h1>
                    </div>
                    )}

            </div>
        </main>
    );
}
