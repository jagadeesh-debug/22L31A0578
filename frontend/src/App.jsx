  import "./App.css";
  import { useState, useEffect } from "react";

  export default function App() {
    const [url, setUrl] = useState("");
    const [validity, setValidity] = useState("");
    const [shortLink, setShortLink] = useState("");
    const [expiry, setExpiry] = useState("");
    const [recentUrls, setRecentUrls] = useState([]);

    const fetchRecent = async () => {
      try {
        const response = await fetch("http://localhost:4000/shorturls");
        if (response.ok) {
          const data = await response.json();
          setRecentUrls(data);
        }
      } catch (err) {
        console.error("Failed to fetch recent URLs", err);
      }
    };

    useEffect(() => {
      fetchRecent();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:4000/shorturls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            validity: validity ? parseInt(validity) : undefined,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error || "Something went wrong");
          return;
        }

        const data = await response.json();
        setShortLink(data.shortLink);
        setExpiry(data.expiry);

        setUrl("");
        setValidity("");
        fetchRecent(); // refresh recent list
      } catch (error) {
        console.error(error);
        alert("Failed to connect to server");
      }
    };

    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      alert("Link copied!");
    };

    return (
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>Paste Your URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            required
          />

          <div className="buttons">
            <button type="submit">Short it</button>
           
          </div>

          <div className="validity">
            <label>Validity (minutes)</label>
            <input
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              placeholder="30"
            />
          </div>
        </form>

        {shortLink && (
          <div className="result">
            <p>Short Link: {shortLink}</p>
            <p>Expiry: {expiry}</p>
          </div>
        )}

        
        <div className="recent">
          <h3>Last 5 Short URLs</h3>
          {recentUrls.length === 0 ? (
            <p>No URLs yet.</p>
          ) : (
          <ul>
  {recentUrls.map((item) => (
    <li key={item._id}>
      <a
        href={`http://localhost:4000/${item.ShortCode}`}
        target="_blank"
        rel="noreferrer"
      >
        {`http://localhost:4000/${item.ShortCode}`}
      </a>
      <button
        onClick={() =>
          handleCopy(`http://localhost:4000/${item.ShortCode}`)
        }
      >
        Copy
      </button>
    </li>
  ))}
</ul>

          )}
        </div>
      </div>
    );
  }
