<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    Click Me
                </v-btn>
            </template>

            <v-card style="background-color: #528cc7;">
                <v-card-title class="headline grey lighten-2">
                    Payment

                    <v-spacer></v-spacer>

                    <v-btn fab small shaped>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12"
                                    md="4"
                            >
                                <v-text-field

                                        v-model="firstname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="First name"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="12"
                                    md="4"
                            >
                                <v-text-field
                                        v-model="lastname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Last name"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="12"
                                    md="4"
                            >
                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>

                <v-card-text>
                    <div class="form-row">

                        <card class='stripe-card'
                              :class='{ complete }'
                              :stripe='stripeKey'
                              :options='stripeOptions'
                              @change='complete = $event.complete'
                        />
                    </div>
                </v-card-text>


                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</v-btn>

                    <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                    >
                        I accept
                    </v-btn>
                    <v-btn @click="cancelSub">Cancel sub</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    // import { stripeKey, stripeOptions } from './stripeConfig.json'
    import {Card, createPaymentMethod} from 'vue-stripe-elements-plus'

    export default {

        name: "StripeForm",
        data() {
            return {
                dialog: false,
                complete: false,
                paymentParams: null,
                stripeKey: "pk_test_6vdeN5MXN141j01z54Ix2KpW00p4EtOVI5",
                stripeOptions: {
                    // see https://stripe.com/docs/stripe.js#element-options for details
                    style: {
                        base: {
                            color: '#32325d',
                            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                            fontSmoothing: 'antialiased',
                            fontSize: '16px',
                            '::placeholder': {
                                color: '#aab7c4'
                            }
                        },
                        invalid: {
                            color: '#fa755a',
                            iconColor: '#fa755a'
                        }
                    },
                },


                valid: false,
                firstname: '',
                lastname: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 10 || 'Name must be less than 10 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        components: {Card},

        methods: {
            pay() {
                // createToken returns a Promise which resolves in a result object with
                // either a token or an error key.
                // See https://stripe.com/docs/api#tokens for the token object.
                // See https://stripe.com/docs/api#errors for the error object.
                // More general https://stripe.com/docs/stripe.js#stripe-create-token.
                // createToken().then(data => console.log(data.token))

                createPaymentMethod('card',

                    {
                        billing_details: {
                            name: "TestbillingName",
                        },
                    }
                ).then(res => {
                        if (res.error) {
                            console.log('an error')
                            console.log(res)
                        } else {
                            this.paymentParams = {
                                price_id: "price_1HWHm9ItUSaeIoBNm73Yydui",
                                payment_method: res.paymentMethod.id,
                            };

                            // 73ef612584c212fee45c0aa2fb12f393dd50f7b7
                            // 73ef612584c212fee45c0aa2fb12f393dd50f7b7

                            this.$axios.post('http://localhost:8000/api/payment/create-sub/',
                                this.paymentParams,

                                {
                                    headers: {
                                        // 'Content-Type': 'application/json',
                                        'Authorization': 'Token 73ef612584c212fee45c0aa2fb12f393dd50f7b7'
                                    }
                                },
                            ).then(res => {
                                console.log(res)

                                if (res.error) {
                                    // The card had an error when trying to attach it to a customer
                                    throw res;
                                }

                                if (res && res.data.status === 'active') {

                                    window.location.href = '/complete';
                                }

                                // return res;

                            }).catch(err => {
                                console.log(err)
                            })
                        }


                    }
                )

            },

            cancelSub() {
                this.$axios.post('http://localhost:8000/api/payment/cancel-sub/',
                    this.paymentParams,

                    {
                        headers: {
                            // 'Content-Type': 'application/json',
                            'Authorization': 'Token 73ef612584c212fee45c0aa2fb12f393dd50f7b7'
                        }
                    },
                ).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
    .stripe-card {
        /*width: 300px;*/
        box-sizing: border-box;

        height: 40px;

        padding: 10px 12px;

        border: 1px solid transparent;
        border-radius: 4px;
        background-color: white;

        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .stripe-card.complete {
        border-color: green;
    }

    .stripe-card.focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .stripe-card--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .stripe-card.invalid {
        border-color: #fa755a;
    }

    .stripe-card--invalid {
        border-color: #fa755a;
    }

    .stripe-card--webkit-autofill {
        background-color: #fefde5 !important;
    }

    /**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
    .StripeElement {
        box-sizing: border-box;

        height: 40px;

        padding: 10px 12px;

        border: 1px solid transparent;
        border-radius: 4px;
        background-color: white;

        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }


</style>