import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketForm: React.FC = () => {
  const [totalTickets, setTotalTickets] = useState<number | "">("");
  const [ticketReleaseRate, setTicketReleaseRate] = useState<number | "">("");
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState<
    number | ""
  >("");
  const [maxTicketCapacity, setMaxTicketCapacity] = useState<number | "">("");
  const [availableTickets, setAvailableTickets] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isSimulationRunning, setIsSimulationRunning] =
    useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      maxTicketCapacity,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/configurations",
        formData
      );
      console.log("Data saved:", response.data);
      setMessage("Data saved successfully!");
      setAvailableTickets(totalTickets as number); // Update available tickets
      setLogs((prevLogs) => [
        ...prevLogs,
        "Configuration submitted successfully.",
      ]);
      // Reset the form after successful submission
      setTotalTickets("");
      setTicketReleaseRate("");
      setCustomerRetrievalRate("");
      setMaxTicketCapacity("");
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Failed to save data. Please try again.");
    }
  };

  const handleStart = async () => {
    if (isSimulationRunning) return;

    try {
      if (eventSource) {
        eventSource.close(); // Close existing SSE connection
        setEventSource(null);
      }
      setLogs([]); // Clear logs for new start
      const response = await axios.get(
        "http://localhost:8080/api/tickets/start"
      );
      console.log("Start process:", response.data);
      setLogs((prevLogs) => [...prevLogs, "Started ticket processing."]);
      setIsSimulationRunning(true); // Mark simulation as running

      // Initialize SSE connection
      const source = new EventSource("http://localhost:8080/api/tickets");
      source.onmessage = (event) => {
        console.log("Server-sent event:", event.data);
        setLogs((prevLogs) => [...prevLogs, event.data]);

        // Handle "Simulation complete." event
        if (event.data === "Simulation complete.") {
          setIsSimulationRunning(false); // Mark simulation as ready to restart
          source.close(); // Close SSE connection
          setEventSource(null);
        }
      };
      source.onerror = () => {
        console.error("SSE connection error. Attempting to reconnect...");
        setLogs((prevLogs) => [...prevLogs, "FrontEnd:SSE connection error."]);
        source.close();
        setEventSource(null);
        setIsSimulationRunning(false); // Allow retry
      };
      setEventSource(source);
    } catch (error) {
      console.error("Error starting process:", error);
      setLogs((prevLogs) => [
        ...prevLogs,
        "Failed to start ticket processing.",
      ]);
    }
  };

  const handleStop = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tickets/stop"
      );
      console.log("Stop process:", response.data);
      setLogs((prevLogs) => [
        ...prevLogs,
        "FrontEnd:Stopped ticket processing.",
      ]);
      setIsSimulationRunning(false); // Mark simulation as ready to restart

      // Close SSE connection
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    } catch (error) {
      console.error("Error stopping process:", error);
      setLogs((prevLogs) => [...prevLogs, "Failed to stop ticket processing."]);
    }
  };

  useEffect(() => {
    // Cleanup SSE connection on component unmount
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Ticket Management Form</h2>
      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* Input Fields */}
        <div>
          <label htmlFor="totalTickets">Total Tickets:</label>
          <input
            type="number"
            id="totalTickets"
            value={totalTickets}
            onChange={(e) => setTotalTickets(Number(e.target.value) || "")}
            required
          />
        </div>
        <div>
          <label htmlFor="ticketReleaseRate">Ticket Release Rate (ms):</label>
          <input
            type="number"
            id="ticketReleaseRate"
            value={ticketReleaseRate}
            onChange={(e) => setTicketReleaseRate(Number(e.target.value) || "")}
            required
          />
        </div>
        <div>
          <label htmlFor="customerRetrievalRate">
            Customer Retrieval Rate (ms):
          </label>
          <input
            type="number"
            id="customerRetrievalRate"
            value={customerRetrievalRate}
            onChange={(e) =>
              setCustomerRetrievalRate(Number(e.target.value) || "")
            }
            required
          />
        </div>
        <div>
          <label htmlFor="maxTicketCapacity">Max Ticket Capacity:</label>
          <input
            type="number"
            id="maxTicketCapacity"
            value={maxTicketCapacity}
            onChange={(e) => setMaxTicketCapacity(Number(e.target.value) || "")}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <h4>Available Tickets:</h4>
        <input type="number" readOnly value={availableTickets} />
        <div style={{ marginTop: "15px" }}>
          <button
            onClick={handleStart}
            disabled={isSimulationRunning} // Disable Start button while running
            style={{
              marginRight: "10px",
              backgroundColor: isSimulationRunning ? "#ccc" : "#28a745",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isSimulationRunning} // Disable Stop button if not running
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Stop
          </button>
        </div>
        <h4 style={{ marginTop: "15px" }}>Logs:</h4>
        <ul
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketForm;
