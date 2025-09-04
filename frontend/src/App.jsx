export default function App(){
  return (
    <div className="containter">
      <form className="form">
        <label className="label">Paste Your URL</label>
        <input className="input-url" type="text" placeholder="www.https://longUrl.com"/>
         <div className="buttons">
        <button className="short" type="submit">Short it</button>
        <button className="copy" type="submit">copy</button>
         </div>
        <div className="time">
         <label className="timer">Validity</label>
         <input className="time-input" type="text"/>
         </div>
      </form> 
    </div>
  )
}