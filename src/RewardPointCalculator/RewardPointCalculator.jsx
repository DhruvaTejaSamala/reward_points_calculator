import React from 'react'

const RewardPointCalculator = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldFail, setShouldFail] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      setError(null);
      fetchTransactions(shouldFail)
        .then((data) => {
          setTransactions(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [shouldFail]);
  
    const toggleError = () => {
      setShouldFail(!shouldFail);
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return (
      <div>
        <p>Error: {error}</p>
        <button onClick={toggleError}>Retry</button>
      </div>
    );
  
    const rewardsData = calculateRewards(transactions);
  
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Customer Reward Points</h1>
        <button onClick={toggleError} style={{ marginBottom: '20px' }}>
          {shouldFail ? 'Load Data' : 'Simulate Error'}
        </button>
        {Object.entries(rewardsData).map(([customerId, monthlyPoints]) => (
          <div key={customerId} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2>Customer {customerId}</h2>
            <p>Month 1: {monthlyPoints[0]} points</p>
            <p>Month 2: {monthlyPoints[1]} points</p>
            <p>Month 3: {monthlyPoints[2]} points</p>
            <p><strong>Total: {monthlyPoints.reduce((a, b) => a + b, 0)} points</strong></p>
          </div>
        ))}
      </div>
    );
  }

export const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += 2 * (amount - 100);
      points += 50; // 1 point for each dollar between $50 and $100
    } else if (amount > 50) {
      points += amount - 50;
    }
    return Math.floor(points);
  };
  

  export const calculateRewards = (transactions) => {
    const rewards = {};
    transactions.forEach((transaction) => {
      const { customerId, amount, date } = transaction;
      const points = calculatePoints(amount);
      const month = new Date(date).getMonth();
      
      if (!rewards[customerId]) {
        rewards[customerId] = Array(3).fill(0);
      }
      rewards[customerId][month] += points;
    });
    return rewards;
  };

export default RewardPointCalculator