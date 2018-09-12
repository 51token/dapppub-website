export const feePercent = raw => {
  const { 
    init_fee_percent, 
    base_fee_percent,
    start_time,
    lock_up_period
  } = raw; 

  if (init_fee_percent === base_fee_percent) return base_fee_percent;

  const now = (Date.now() / 1000);
  return parseFloat(lock_up_period * (init_fee_percent- base_fee_percent) / (2 * (now - start_time) + lock_up_period) + base_fee_percent).toFixed(0);
};

export const hexTransform = raw => {
  return Number('0x' + raw.slice(2).match(/\w{2}/g).reverse().join('')) / 10000;
};

