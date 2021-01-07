new Vue({
    "el": "#app",
    data: {
        "currencies": {},
        "from": "",
        "to": "",
        "amount": null,
        "loading": false,
        "result": 0
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies')

            if (currencies) {
                this.currencies = JSON.parse(currencies)

                return
            }

            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key').then(response => {
                this.currencies = response.data.results
                localStorage.setItem('currencies', JSON.stringify(response.data.results))
            })
        },
        convertCurrency() {
            const key = `${this.from}_${this.to}`
            this.loading = true

            axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&compact=ultra&apiKey=addec4b738982eaa1370`).then(response => {
                this.result = response.data[key]
                this.loading = false
            })

        }
    },
    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies)
        },
        calculatedCurrencyValue() {
            return (this.result * Number(this.amount)).toFixed(2)
        },
        disabled() {
            return this.amount === null || !this.amount || this.loading || ! this.from || !this.to
        }
    },
    watch: {
        from() {
            this.result = null
        },
        to() {
            this.result = null
        }
    },
    mounted() {
        this.getCurrencies()
    }
})