<template>
    <v-footer
            color="#0B0238"
            padless
    >
        <v-row
                justify="center"
                no-gutters
        >
            <v-col>
                <v-img max-width="200" class="ml-3 my-10" :src="require('../assets/4.png')"></v-img>
            </v-col>
            <v-col class="my-7" v-for="item in footerItem" :key="item.id">
                <h1 class="ml-4" style="color:white;">{{item.category}}</h1>
                <v-btn
                        v-for="subItem in item.child"
                        :key="subItem.id"
                        color="white"
                        text
                        rounded
                        class="my-2"
                >
                    {{subItem.name}}
                </v-btn>
<!--                <router-link v-for="subItem in item.child" :key="subItem.id" :to="subItem.to">-->
<!--                    <h3 style="color:white;"  >{{subItem.name}}</h3>-->

<!--                </router-link>-->
            </v-col>
<!--            <v-col cols="12" sm="4"></v-col>-->
<!--            <v-col cols="12" sm="4"></v-col>-->
<!--            <v-col cols="12" sm="4"></v-col>-->
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",

        data: () => ({
            footerItem: [
                {
                    id: 1, category: 'COMPANY',
                    child: [
                        {id: 1, name: 'About Us', to: '/about'},
                        {id: 2, name: 'Careers', to: '/career'},
                    ]
                },
                {
                    id: 2, category: 'SERVICES',
                    child: [
                        // todo: to not set yet.
                        {id: 1, name: 'Ovex Broker', to: '/about'},
                        {id: 2, name: 'Arbitrage Messages', to: '/career'},
                        {id: 3, name: '10M Allowance Applications', to: '/career'},
                        {id: 4, name: 'Buying Crypto', to: '/career'},
                    ]
                },
                {
                    id: 3, category: 'LEGAL',
                    child: [
                        // todo: to not set yet.
                        {id: 1, name: 'Terms and Conditions', to: '/about'},
                        {id: 2, name: 'Arbitrage Service', to: '/career'},
                        {id: 3, name: 'Interest Account', to: '/career'},
                    ]
                },
                {
                    id: 4, category: 'COMMUNITY',
                    child: [
                        // todo: to not set yet.
                        {id: 1, name: 'Twitter', to: '/about'},
                        {id: 2, name: 'Telegram', to: '/career'},
                        {id: 3, name: 'Facebook', to: '/career'},
                    ]
                },
            ]
        }),

    }
</script>

<style scoped>

</style>