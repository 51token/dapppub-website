export default class Token {

    constructor() {
        this.symbol = {value:1112887300};
        this.owner = "godofdapppub";
        this.base_eos = "0xb24cf605000000000000000000000000";
        this.base_stake = "8000817668";
        this.base_option = 2000000000;
        this.deserved_option = 817668;
        this.claimed_option = 0;
        this.eos = "0x678fad06000000000000000000000000";
        this.stake = "7143150027";
        this.lock_up_period = 31536000;
        this.start_time = 1535446512;
        this.base_fee_percent = 5;
        this.init_fee_percent = 50;
    }

    feePercent() {
        if (this.init_fee_percent == this.base_fee_percent) {
            return base_fee_percent;
        }
        const INIT = this.init_fee_percent;
        const BASE = this.base_fee_percent;
        const NOW = (Date.now()/1000).toFixed(0);
        const START = this.start_time;
        const PERIOD = this.lock_up_period;

        return parseFloat(PERIOD * (INIT - BASE) / (2 * (NOW-START) + PERIOD) + BASE).toFixed(0);
    }

    issueStake(stake_amount) {
        if (!(stake_amount > 0)) {
            throw "amount of stake issuance should be bigger than zero";
        }

        if (this.stake == this.base_stake) {
            this.base_stake += stake_amount;
            this.stake += stake_amount;
            return;
        }

        if (!(stake < base_stake)) {
            throw "stake should be less than base_stake";
        }

        const BASE_STAKE = this.base_stake;
        const BASE_EOS = this.base_eos;
        const STAKE = this.stake;
        const EOS = this.eos;
        const NEW_STAKE = stake_amount;

        this.eos = ((BASE_STAKE + NEW_STAKE) * (EOS - BASE_EOS) / (BASE_STAKE + NEW_STAKE - STAKE)).toFixed(0);
        this.base_eos = ((STAKE) * (EOS - BASE_EOS) / (BASE_STAKE + NEW_STAKE - STAKE)).toFixed(0);
        this.base_stake += stake_amount;
    }

    updateOption() {
        // no option or all options has been deserved.
        if ((this.base_option == 0) || (this.deserved_option == this.base_option)) {
            return;
        }

        const last_deserved_option = deserved_option;
        
        const NOW = (Date.now()/1000).toFixed(0);
        const START = this.start_time;
        const PERIOD = this.lock_up_period;
        const BASE = this.base_option;

        if ((NOW - START) >= PERIOD) {
            this.deserved_option = this.base_option;
        } else {
            this.deserved_option = (BASE * (NOW - START) / PERIOD).toFixed(0);
        }

        if (this.deserved_option == last_deserved_option) {
            return;
        }

        const new_deserved_option = deserved_option - last_deserved_option;
        issueStake(new_deserved_option);
    }

    buy(eos_amount) {
        updateOption();

        const STAKE = this.stake;
        const EOS = this.eos;
        const IN  = eos_amount;

        const stake_amount = ((IN*STAKE) / (IN+EOS)).toFixed(0);

        this.eos += eos_amount;
        this.stake -= stake_amount;
        return stake_amount;
    }

    sell(stake_amount) {
        updateOption();

        const STAKE = this.stake;
        const EOS = this.eos;
        const IN  = stake_amount;

        eos_amount = ((IN*EOS)/(STAKE+IN)).toFixed(0);

        this.eos -= eos_amount;
        this.stake += stake_amount;

        let fee = 0;
        const fee_percent = feePercent();
        if (fee_percent > 0 && this.stake < this.base_stake) {
            fee = (eos_amount * fee_percent + 99) / 100;
        }
        return eos_amount - fee;
    }
}