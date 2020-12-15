<template>
    <div>
        <LineChart/>
    </div>
</template>
<script>

    import LineChart from "@/components/LineChart";
    export default {
        name: "CryptoView",

        components: {
            LineChart

        },
        data () {
            return {

            }
        },
        mounted () {


        },
        methods: {

        }
    }
</script>

<style >

    .line-chart{
        height: 150px;
        /*margin:  150px auto;*/
    }

</style>