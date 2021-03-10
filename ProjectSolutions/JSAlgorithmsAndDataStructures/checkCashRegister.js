function checkCashRegister(price, cash, cid) {
    //time to practice OOP

    function CashRegister() {

        this.purchasePrice = price;
        this.paymentCashAmount = cash;
        this.cashInDrawer = cid;

        this.about = {
            status: undefined,
            change: undefined,
        };

        (this.expandCashInDrawer = function () {
            for (let entry of this.cashInDrawer) {
                switch (entry[0]) {
                    case "PENNY":
                        entry[2] = Math.floor(entry[1] / 0.01);
                        entry[3] = 0.01;
                        break;
                    case "NICKEL":
                        entry[2] = Math.floor(entry[1] / 0.05);
                        entry[3] = 0.05;
                        break;
                    case "DIME":
                        entry[2] = Math.floor(entry[1] / 0.1);
                        entry[3] = 0.1;
                        break;
                    case "QUARTER":
                        entry[2] = Math.floor(entry[1] / 0.25);
                        entry[3] = 0.25;
                        break;
                    case "ONE":
                        entry[2] = Math.floor(entry[1] / 1);
                        entry[3] = 1;
                        break;
                    case "FIVE":
                        entry[2] = Math.floor(entry[1] / 5);
                        entry[3] = 5;
                        break;
                    case "TEN":
                        entry[2] = Math.floor(entry[1] / 10);
                        entry[3] = 10;
                        break;
                    case "TWENTY":
                        entry[2] = Math.floor(entry[1] / 20);
                        entry[3] = 20;
                        break;
                    case "ONE HUNDRED":
                        entry[2] = Math.floor(entry[1] / 100);
                        entry[3] = 100;
                        break;
                }
            }
        }),

        (this.getAmountDue = function () {
            return this.paymentCashAmount - this.purchasePrice;
        }),

        (this.getTotalCashInDrawer = function () {
            let totalCashRegister = 0;
            for (let denominations of this.cashInDrawer) {
                totalCashRegister += denominations[1];
            }
            return totalCashRegister;
        }),

        (this.getChange = function () {

            let needToCalculateChange = false;

            // first, check if there's enough cash in drawer to even work with
            if (this.getAmountDue() > this.getTotalCashInDrawer()) {
                this.about.status = "INSUFFICIENT_FUNDS";
                this.about.change = [];
            } else {
                // there is... is by any chance the amount due === what's in the drawer?
                if (this.getAmountDue() === this.getTotalCashInDrawer()) {
                    this.about.status = "CLOSED";
                    this.about.change = this.cashInDrawer;
                } else {
                    // need to go further at this point, trivial cases dealt with
                    needToCalculateChange = true;
                }
            }

            if (needToCalculateChange) {

                let outputArray = [];
                let amountDue = this.getAmountDue();
                this.expandCashInDrawer();

                for (let i = this.cashInDrawer.length - 1; i >= 0; i--) {

                    if (this.cashInDrawer[i][2] === 0) {
                        outputArray.unshift([this.cashInDrawer[i][0], 0]);
                    } else {
                        if (this.cashInDrawer[i][3] <= amountDue) {

                            let currencyUnits = Math.floor(amountDue / this.cashInDrawer[i][3]);
                            while (currencyUnits > this.cashInDrawer[i][2]) {
                                currencyUnits--;
                            }

                            amountDue -= Math.round(currencyUnits * this.cashInDrawer[i][3] * 100) / 100;
                            amountDue = Math.round(amountDue * 100) / 100;

                            this.cashInDrawer[i][2] -= currencyUnits;
                            this.cashInDrawer[i][1] -= currencyUnits * this.cashInDrawer[i][3];

                            outputArray.unshift([
                                this.cashInDrawer[i][0],
                                currencyUnits * this.cashInDrawer[i][3],
                            ]);
                        }
                    }
                }

                if (amountDue > 0) {
                    this.about.status = "INSUFFICIENT_FUNDS";
                    this.about.change = [];
                } else {
                    this.about.status = "OPEN";
                    if (this.getAmountDue() > 10) {
                        outputArray.reverse();
                    }
                    this.about.change = outputArray;
                }
            }
        });
    }


    let awesomeCashRegister = new CashRegister();
    awesomeCashRegister.getChange();
    return awesomeCashRegister.about;
}