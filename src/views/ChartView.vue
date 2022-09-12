<template>
  <v-container  class=" tradingview-widget-container" >
    <v-card id="tradingview_5d418" height="80vh"></v-card>
    <div class="tradingview-widget-copyright">
      <a
        href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
        rel="noopener"
        target="_blank"
        ><span class="blue-text">AAPL Chart</span></a
      >
      by TradingView
    </div>
</v-container>
</template>

<script>

export default {
    name: 'ChartView',
    data(){return {
        symbols:{
            bitcoin:'btcusd',
            ripple:'xrpusd',
            litecoin:'ltcusd',
            binanccoin :'bnbusd',
            ethereum:'ethusd',

        }
    }},
    props: {
        chartC: {
            default: 's'
        }
    },
    //TODO -- add tradingview script in created hook
    mounted() {
        this.init()
    },
    methods: {
        init() {
            new TradingView.widget({
                    "autosize": true,
                    "symbol": this.symbols[this.$route.params.coin]||' bchusd',
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "light",
                    "style": "1",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "allow_symbol_change": true,
                    "container_id": "tradingview_5d418"})


            }
    }

}
</script>
