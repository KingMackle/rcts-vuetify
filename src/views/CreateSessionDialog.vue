<template>
    <div>
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn fab small color="pink" class="ml-3" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline blue dark" primary-title>
                    Create training session
                </v-card-title>
                <v-divider></v-divider>
                
                <v-form class="create-session-form" @submit="sendNewTrainingSessionData" ref="form" v-model="valid">
                    
                    <div v-if="errors.length">
                        <p>
                            <b>Please add the following information:</b>
                        </p>
                        <ul>
                            <li class="error-item" v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    
                    <!--Input for Session Title -->
                    <v-text-field v-model="title" :counter="15" label="Add a name for the session" required>
                    </v-text-field>
                
                    <!--Number of participants for the session -->
                    <v-select class="participants" :items="participantsValues" v-model="participants"  label="Number of participants" solo> 
                    </v-select>
                    
                    <!--Input for Session Location -->
                    <v-text-field v-model="location" :counter="20" label="Location" required>
                    </v-text-field>
                    
                    <!--Time selection for the session -->
                    <v-row>
                        <v-col cols="11" sm="5">
                            <!--Menu for selecting starting time -->
                            <v-menu
                            ref="startMenu"
                            v-model="startingTimeMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="startingTimeValue"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="startingTimeValue"
                                    label="Starting time"
                                    prepend-icon=""
                                    readonly
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-if="startingTimeMenu"
                                  v-model="startingTimeValue"
                                  full-width @click:minute="$refs.startMenu.save(startingTimeValue)"
                            ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="11" sm="5">
                            <!--Menu for selecting ending time -->
                            <v-menu
                            ref="endMenu"
                            v-model="endingTimeMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="endingTimeValue"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="endingTimeValue"
                                    label="Ending time"
                                    prepend-icon=""
                                    readonly
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                     v-if="endingTimeMenu"
                                      v-model="endingTimeValue"
                                      full-width @click:minute="$refs.endMenu.save(endingTimeValue)"
                            ></v-time-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    
                    <!--Date Picker -->
                    <v-menu
                    ref="datePickerMenu"
                    v-model="datePickerMenu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date"
                            label="Session date"
                            prepend-icon=""
                            readonly
                            v-on="on">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.datePickerMenu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-form>
                
                <!--Create Session Button -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" rounded dark type="submit" @click="sendNewTrainingSessionData">
                        Create Session
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    export default{
        name: "Todos",
        data: () => ({
            errors: [],
            dialog: false,
            participants: '',
            location: '',
            title: '',
            participantsValues: ['5', '10', '15', '20'],
            date: '',
            startingTimeValue: '',
            endingTimeValue: '',
            startingTimeMenu: false,
            endingTimeMenu: false,
            datePickerMenu: false,
            
            valid: false,
            titleRules: [
                v => !!v || 'A name for the session is required',
                v => v.length <= 10 || 'Name must be less than 15 characters',
            ],
            locationRules: [
                v => !!v || 'A location for the session is required',
                v => v.length <= 10 || 'Location must be less than 20 characters',
            ],
            startingTimeRules: [
                v => !!v || 'A starting time for the session is required',
            ],
            endingTimeRules: [
                v => !!v || 'An ending time for the session is required',
            ]
        }),
        methods: {
              sendNewTrainingSessionData(e) {
                  e.preventDefault();
                  
                  this.errors = [];

                if (this.title === '') {
                    this.errors.push('Add a title for the session');
                } 

                if (this.participants === '') {
                    this.errors.push('Select a number of participants for the session');
                } 

                if (this.location === '') {
                    this.errors.push('Select a remote location for the session');
                }

                if (this.startingTimeValue === '') {
                    this.errors.push('Select a starting time for the session');
                }

                if(this.endingTimeValue === ''){
                    this.errors.push('Select an ending time for the session');
                }
                  
                //Check that starting time is not greater than ending time
                if (this.startingTimeValue !== '' && this.endingTimeValue !== '') {
                    var startTime = new Date();
                    var endTime = new Date();
                    
                    var tempStartTime = this.startingTimeValue.split(":");
                    var tempEndTime = this.endingTimeValue.split(":");
                    
                    startTime.setHours(parseInt(tempStartTime[0]), parseInt(tempStartTime[1]), 0);
                    endTime.setHours(parseInt(tempEndTime[0]), parseInt(tempEndTime[1]), 0);
                    
                    if (startTime >= endTime){
                        this.errors.push('Starting time cannot be greater or equal than ending time');
                    }
                }

                if(this.date === ''){
                    this.errors.push('Select a date for the session');
                }

                if (!this.errors.length) {
                    const newSession = {
                          title: this.title,
                          participants: this.participants,
                          location: this.location,
                          startingTimeValue: this.startingTimeValue,
                          endingTimeValue: this.endingTimeValue,
                          date: this.date
                    }
                    console.log(newSession)
                    this.$emit('new-session', newSession);
                    
                    this.title = '';
                    this.participants = '';
                    this.location = '';
                    this.startingTimeValue = '';
                    this.endingTimeValue = '';
                    this.date = '';
                    
                    this.dialog = false;
                }
            }
            
        }
    }
</script>

<style scoped>
    .headline{
        color: #fff;
    }
    .create-session-form {
        padding: 2%;
    }
    .participants{
        margin-top: 6px;
    }
    .error-item{
        text-align: left;
        color: brown;
    }
</style> 
