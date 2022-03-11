import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

function Nav() {
  return (
    <div className='nav'>
      Bench Test
    </div>
  )
}

function TransactionsHeader ({transactions}) {
  const sum = transactions.reduce((acc, transaction) => acc + Number(transaction.Amount), 0);
  return (
    <tr className='transactions-header'>
      <th>Date</th>
      <th>Company</th>
      <th>Account</th>
      <th className='transaction-cell-right'>{`$${sum.toFixed(2)}`}</th>
      {/* TODO - Use request data */}
    </tr>
  )
}

function TransactionsItem ({transaction}) {
  
  const {Date, Company, Ledger, Amount} = transaction;
  const numAmount = Number(Amount);
  const isDebit = numAmount > 0;

  return (
    <tr className={`transactions-item ${isDebit ? "transaction-row-debit" : ""}`}>
      <td>{moment(Date).format("MMM Do, YYYY")}</td>
      <td>{Company}</td>
      <td>{Ledger}</td>
      <td className='transaction-cell-right'>{`$${Math.abs(numAmount).toFixed(2)}`}</td>
    </tr>
  )
}

function Transactions ({transactions}) {
  return (
    <table className='transactions-table'>
      <TransactionsHeader transactions={transactions} />
      {transactions.map((transaction) => (
        <TransactionsItem transaction={transaction} />
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
      {Array.isArray(transactions) ? 
        <Transactions transactions={transactions} />
      :
        <Loading />
      }
      
    </div>
  );
}

export default App;