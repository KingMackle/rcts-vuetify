<template>
    <v-layout row wrap align-start justify-start>
        <section class="enrolled-trainees">
            <h1 class="enrolled-trainees__title">Enrolled Trainees</h1>
                <div id="trainee-cards" class="enrolled-trainees__cards">
                    <v-card
                        v-for="trainee in trainees[0]" v-bind:key="trainee.names"
                        class="mx-auto enrolled-trainees__card"
                        max-width="344"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">Trainee Information</div>
                                <v-card-title class="headline mb-1">{{ trainee.name }}</v-card-title>
                                <v-card-subtitle class="pb-0">ID: {{ trainee.id }}</v-card-subtitle>
                                <v-card-text class="text--primary">{{ trainee.location }}</v-card-text>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                            <v-btn color="orange" text>View Performance Data</v-btn>
                        </v-card-actions>
                    </v-card>
                </div> 
        </section>
    </v-layout>
</template>

<style scoped>
    .enrolled-trainees__title {
        margin: 1em;
    }
    .enrolled-trainees__cards {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .enrolled-trainees__card {
        margin: 1em;
        transition: transform 0.5s
    }
    .enrolled-trainees__card:hover {
        transform: scale(1.03)
    }
</style>

<script>
    import { State } from '@/state'

    export default {
        data() {
            return {
                trainees: []
            }
        },
        mounted() {
            this.trainees.push(State.users.filter(user => user.type === 'trainee'))
            console.log(this.trainees)   
        }
    }
</script>