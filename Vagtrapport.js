import { useState } from "react";

export default function Vagtrapport() {
  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  const [report, setReport] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("https://vagtrapport.onrender.com/send-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, shift, report }),
    });
    
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-lg w-full border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Vagtrapport</h2>
        <input placeholder="Navn" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-2" />
        <input placeholder="Vagt type" value={shift} onChange={(e) => setShift(e.target.value)} className="border p-2 w-full mb-2" />
        <textarea placeholder="Skriv din rapport her..." value={report} onChange={(e) => setReport(e.target.value)} className="border p-2 w-full mb-4" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Send rapport</button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
