<template>
    <v-layout row wrap align-start justify-start>
        <section class="enrolled-trainees">
            <h1 class="enrolled-trainees__title">Enrolled Trainees</h1>
                <div id="trainee-cards" class="enrolled-trainees__cards">
                    <v-card
                        v-for="trainee in trainees" :key="trainee.name"
                        class="mx-auto enrolled-trainees__card"
                        max-width="344">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">Trainee Information</div>
                                <v-card-title class="headline mb-1">{{ trainee.name }}</v-card-title>
                                <v-card-subtitle class="pb-0">ID: {{ trainee.id }}</v-card-subtitle>
                                <v-card-text class="text--primary">{{ trainee.location }}</v-card-text>
                            </v-list-item-content>
                        </v-list-item>
                        <p v-if="trainee.performance === 'good'" class="performance-status good-performance">Good performance</p>
                        <p v-if="trainee.performance === 'bad'" class="performance-status bad-performance">Bad performance</p>
                        <v-card-actions>
                            <v-btn color="orange" @click="viewPerformanceData" text>View Performance Data</v-btn>
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
    .performance-status {
        display: block;
        width: 40%;
        padding: 5px;
        border-radius: 5px;
        text-align: center;
        font-size: 0.8em;
        font-weight: 500;
        margin: 0.5em 1.5em;
    }
    .good-performance {
        border: 2px solid #26A69A;
        color: #26A69A;
    }
    .bad-performance {
        border: 2px solid #EF5350;
        color: #EF5350;
    }
</style>

<script>
    import { State } from '@/state'

    export default {
        data() {
            return {
            }
        },
        computed: {
            trainees: function () {
                return State.users.filter(user => user.type === 'trainee');
            }
        },
        methods: {
            viewPerformanceData () {
                this.$router.push('performanceData');
            }
        }
    }
</script>