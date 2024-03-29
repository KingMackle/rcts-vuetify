<template>
    <v-col>
      <v-sheet >
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
            <!-- Create Session Button -->
            <CreateSessionDialog v-if="currentUser.type === 'trainer'" v-on:new-session="addNewSession"/>
            
        <!--
          <v-btn fab small color="pink" class="ml-3" v-on="on">
              <v-icon>mdi-plus</v-icon>
          </v-btn>
        -->
        </v-toolbar>
      </v-sheet>
      <v-sheet height="48rem">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <!-- <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn> -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <!-- <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn> -->
              <v-btn text color="primary" @click="redirectToEvent">View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
</template>

<script>
import { State } from '@/state'
import CreateSessionDialog from './CreateSessionDialog.vue';

export default {
    data: () => ({
      focus: (new Date()).toString(),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: State.sessions,
      currentUser: State.currentUser
    }),
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    components: {
        CreateSessionDialog
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      redirectToEvent() {
        if(State.currentUser.type === 'trainer') {
          return this.$router.push('trainingSessionDetails');
        } else {
          return this.$router.push('performanceData');
        }
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
        addNewSession(session){

            const newEvent =  {
                name: session.title,
                details: session.location + ", number of participants: " + session.participants,
                start: session.date + ' ' + session.startingTimeValue,
                end: session.date + ' ' + session.endingTimeValue,
                color: 'green'
            }

            this.events = this.events = [...this.events, newEvent];
        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>