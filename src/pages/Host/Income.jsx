/* eslint-disable react/react-in-jsx-scope */
import '../../styles/Host-Income.css'

export const Income = () => {
  const transactionsData = [
    { amount: 720, date: "Jan 3, '23", id: '1' },
    { amount: 560, date: "Dec 12, '22", id: '2' },
    { amount: 980, date: "Dec 3, '22", id: '3' }
  ]
  return (
        <section className="host-income">
            <h1>Income</h1>
            <p>
                Last <span>30 days</span>
            </p>
            <h2>$2,260</h2>
            <img
                className="graph"
                src="https://firebasestorage.googleapis.com/v0/b/vanlife-app-d9f83.appspot.com/o/Graphs%2Fincome-graph.png?alt=media&token=ab10fc9b-b265-4f62-b7b6-e24049f66e04"
                alt="Income graph"
            />

            <div className="info-header">
                <h3>Your transactions (3)</h3>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="transactions">
                {transactionsData.map((item) => (
                    <div key={item.id} className="transaction">
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
  )
}
