import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expenseAmount} = props
  const balimg =
    'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
  const incimg =
    'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
  const expimg =
    'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

  return (
    <div className="balinex-cont">
      <div className="bal-cont">
        <div className="img-cont">
          <img src={balimg} alt="balance" className="image" />
        </div>
        <div className="txt-cont">
          <p className="info-text">Your Balance</p>
          <p className="amt-text" testid="balanceAmount">
            RS {balanceAmount}
          </p>
        </div>
      </div>
      <div className="inc-cont">
        <div className="img-cont">
          <img src={incimg} alt="income" className="image" />
        </div>
        <div className="txt-cont">
          <p className="info-text">Your Income</p>
          <p className="amt-text" testid="incomeAmount">
            RS {incomeAmount}
          </p>
        </div>
      </div>
      <div className="exp-cont">
        <div className="img-cont">
          <img src={expimg} alt="expenses" className="image" />
        </div>
        <div className="txt-cont">
          <p className="info-text">Your Expenses</p>
          <p className="amt-text" testid="expensesAmount">
            RS {expenseAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
