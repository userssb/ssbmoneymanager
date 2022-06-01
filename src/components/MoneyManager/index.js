import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const optionType = transactionTypeOptions.find(
      eachOption => eachOption.optionId === optionId,
    )
    const {displayText} = optionType

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getBalance = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balanceAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
      balanceAmount = incomeAmount - expenseAmount
    })
    return balanceAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expenseAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })
    return expenseAmount
  }

  render() {
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()
    const name = 'Richard'
    const {titleInput, amountInput, optionId, transactionList} = this.state

    return (
      <div className="bg-cont">
        <div className="name-cont">
          <h1 className="name">Hi, {name}</h1>
          <p className="welcome-text">
            Welcome back to your
            <span className="mm-span">Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
        />

        <div className="text-cont">
          <div className="trans-cont">
            <h1>Add Transaction</h1>
            <form className="form-cont" onSubmit={this.onAddTransaction}>
              <label className="label" htmlFor="txtTitle">
                Title
              </label>
              <input
                onChange={this.onChangeTitleInput}
                type="text"
                id="txtTitle"
                className="input"
                placeholder="Title"
                value={titleInput}
              />

              <label className="label" htmlFor="txtAmount">
                Amount
              </label>
              <input
                onChange={this.onChangeAmountInput}
                type="text"
                id="txtAmount"
                className="input"
                placeholder="Amount"
                value={amountInput}
              />

              <label className="label" htmlFor="type">
                Type
              </label>
              <select
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="btn-add" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="hist-cont">
            <h1>History</h1>
            <div className="table-cont">
              <ul className="table">
                <li className="table-header">
                  <p className="header-cell1">Title</p>
                  <p className="header-cell2">Amount</p>
                  <p className="header-cell3">Type</p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
