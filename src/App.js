import React, { useEffect, useState } from 'react';
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

function Transactions ({transactions}) {
  return (
    <table className='transactions-table'>
      <TransactionsHeader />
      {transactions.map((transaction) => (
        <TransactionsItem />
      ))}
    </table>
  )
}

function Loading () {
  return (
    <div className='message'>Loading...</div>
  )
}

function App() {
  
  const [transactions, setTransactions] = useState(false);
  
  useEffect(()=> {
    setTransactions(fetchTransactions())
  }, [])

  console.log(transactions)
  async function fetchTransactions() {
    let allTransactions = [];
    let page = 1;
    let morePages = true;
    
    while (morePages) {
      let response = await fetch(`https://resttest.bench.co/transactions/${page}.json`);
      let { totalCount, transactions } = await response.json();
      allTransactions = allTransactions.concat(transactions);
      page++;
      morePages = allTransactions.length < totalCount;
    }
    
    setTransactions(allTransactions);
  }

  return (
    <div className="App">
      <Nav />
      {transactions ? 
        <Transactions transactions={transactions} />
      :
        <Loading />
      }
      
    </div>
  );
}

export default App;