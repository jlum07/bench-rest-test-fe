import './App.css';

function Nav() {
  return (
    <div className='nav'>
      Bench Test
    </div>
  )
}

function TransactionsHeader () {
  return (
    <tr className='transactions-header'>
      <th>Date</th>
      <th>Company</th>
      <th>Account</th>
      <th>$100.00</th>
      {/* TODO - Use request data */}
    </tr>
  )
}

function TransactionsItem () {
  return (
    <tr className='transactions-item'>
      <td>2013-12-22</td>
      <td>SHAW CABLESYSTEMS CALGARY AB</td>
      <td>Phone & Internet Expense</td>
      <td>-110.71</td>
    </tr>
  )
}

function Transactions () {
  return (
    <table className='transactions-table'>
      <TransactionsHeader />
      <TransactionsItem />
      <TransactionsItem />
    </table>
  )
}

function App() {

  return (
    <div className="App">
      <Nav />
      <Transactions />
    </div>
  );
}

export default App;