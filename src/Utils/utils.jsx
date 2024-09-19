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