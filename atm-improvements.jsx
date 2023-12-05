
const ATMDeposit = ({ onChange, isValid, onSubmit }) => (

  <div>
    <h3>Deposit</h3>
    <label className="label huge">
      <input id="deposit-input" type="number" width="200" onChange={onChange}></input>
      </label>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} onClick={onSubmit}></input>
  </div>
  );
  
  const ATMCashBack = ({onChange, isValid, onSubmit}) => (
  
  <div>
    <h3>Cash Back</h3>
    <label className="label huge">
      <input id="cashback-input" type="number" width="200" onChange={onChange}></input>
    </label>
    <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} onClick={onSubmit}></input>
  </div>

  );

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setATMMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleModeSelect = (event) => {
    const selectedMode = event.target.value;
    setATMMode(selectedMode);

    setValidTransaction(false);

    if (selectedMode === "") {
      setIsDeposit(true);
    }else{
      setIsDeposit(selectedMode === "Deposit");
    }
  };

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (event.target.value <=0 ||(atmMode === "Cash Back" && event.target.value > totalState)){
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if(atmMode === "Deposit"){
      let newTotal = totalState + deposit;
      setTotalState(newTotal);
    }else if(atmMode === "Cash Back" && deposit <= totalState){
      let newTotal = totalState - deposit;
      setTotalState(newTotal);
    }
    setDeposit(0);
  };

  return (
    <div className="atm-container">
      <h1>ATM Machine</h1>
      <h2 id="total">{status}</h2>
    <div>
      < button className="button-primary"  onClick={() => setATMMode("Deposit")}>Deposit</button>
      <button className="button-primary"   onClick={() => setATMMode("Cash Back")}>Cash Back</button>
    </div>
    {atmMode ==="Deposit" && <ATMDeposit onChange={handleChange} isValid={validTransaction} onSubmit={handleSubmit}/>}
    {atmMode === "Cash Back" && <ATMCashBack onChange={handleChange} isValid={validTransaction} onSubmit={handleSubmit}/>}
     </div>  
    
  );
}
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
