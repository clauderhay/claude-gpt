import { useState, useEffect } from 'react'

function App() {
  const [ value, setValue ] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ previousuChats, setePreviousChats ] = useState([])
  const [ currentTitle, setCurrentTitle ] = useState(null)

  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        messagee: value
      }),
      headers: {
        "Content-Type": "applications/json"
      }
    }
    try {
     const response = await fetch('http://localhost:8000/completions', options)
     const data = await response.json()
     console.log(data)
     setMessage(data.choices[0].message)
    } catch (e) {
      console.error(e);
    }
  }

    useEffect(() => {
      console.log(currentTitle, value, message)
      if (!currentTitle && value && message) {
        setCurrentTitle(value)
      }
      if (currentTitle && value && message) {
        setePreviousChats(prevChats => (
          [...prevChats,
            {
              title: currentTitle,
              role: "user",
              content: "value"
            },
            {
              title: currentTitle,
              role: message.role,
              content: message.content
            }
          ]
        ))
      }
    }, [message, currentTitle])

  
  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>Test</li>
        </ul>
        <nav>
          <p>Made by Claude</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ClaudeGPT</h1> }
        <ul className="feed">
          
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessage}>➢</div>
          </div>
          <p className="info">
            Chat GPT Mar 14 Version. Free Research Preview.
            Our goal is to make AI systems more natural and safe to interact with.
            Your feedback will help us improve.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
