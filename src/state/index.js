export const State = {
         currentUser: undefined,
         users: [
           {
             name: "John Doe",
             email: "john@gmail.com",
             password: "1234",
             id: "abcd",
             location: "Ontario, Canada",
             experienceLevel: "Senior",
             type: "trainer"
           },
           {
             name: "test",
             email: "test",
             password: "test",
             id: "test",
             location: "Ontario, Canada",
             experienceLevel: "Senior",
             type: "trainer"
           },
           {
             name: "Jane Doe",
             email: "jane@gmail.com",
             password: "1234",
             id: "efgh",
             location: "Ontario, Canada",
             educationBackground: "Software Engineering",
             type: "trainee",
             performance: "good"
           },
           {
             name: "Hanane Zlitni",
             email: "hanane@gmail.com",
             password: "1234",
             id: "ijkl",
             location: "Ontario, Canada",
             educationBackground: "Software Engineering",
             type: "trainee",
             performance: "good"
           },
           {
             name: "Diego Monteverde Suàrez",
             email: "diego@gmail.com",
             password: "1234",
             id: "mnop",
             location: "Ontario, Canada",
             educationBackground: "Medicine",
             type: "trainee",
             performance: "bad"
           },
           {
             name: "Mahmoud Mahmoud",
             email: "mahmoud@gmail.com",
             password: "1234",
             id: "qrst",
             location: "Ontario, Canada",
             educationBackground: "Computer Science",
             type: "trainee",
             performance: "bad"
           },
           {
             name: "Joe Doe",
             email: "joe@gmail.com",
             password: "1234",
             id: "uvwx",
             location: "Ontario, Canada",
             educationBackground: "Law",
             type: "trainee",
             performance: "bad"
           },
           {
             name: "Trainee",
             email: "trainee@gmail.com",
             password: "1234",
             id: "yzab",
             location: "California, USA",
             educationBackground: "Chemistry",
             type: "trainee",
             performance: "good"
           }
         ],
         dataSamples: [
           {
             name: "goodPerformance",
             cd: [5, 4.8, 5, 4.7, 4.8, 5],
             cpm: [100, 102, 103, 115, 101, 107],
             recoil: [5, 4.8, 4.9, 4.6, 4.8, 4.9],
             location: "0,0"
           },
           {
             name: "badPerformance",
             cd: [4.5, 4, 4.4, 4.6, 4.2, 4],
             cpm: [95, 99, 96, 89, 90, 92],
             recoil: [4.2, 3.7, 4.0, 4.3, 3.9, 3.7],
             location: "4,-3"
           },
           {
             name: "justBadCd",
             cd: [4.5, 4, 4.4, 4.6, 4.2, 4],
             cpm: [100, 102, 103, 115, 101, 107],
             recoil: [4.4, 4, 4.3, 4.5, 4, 3.9],
             location: "1,1"
           },
           {
             name: "justBadCpm",
             cd: [5, 4.8, 5, 4.7, 4.8, 5],
             cpm: [95, 99, 96, 89, 90, 92],
             recoil: [5, 4.8, 4.9, 4.6, 4.8, 4.9],
             location: "1,1"
           },
           {
             name: "justBadRecoil",
             cd: [5, 4.8, 5, 4.7, 4.8, 5],
             cpm: [100, 102, 103, 115, 101, 107],
             recoil: [4.4, 4, 4.3, 4.5, 4, 3.9],
             location: "1,1"
           }
         ],
         sessions: [
           {
             name: "Session1",
             details: "Toronto, number of participants: 15",
             start: "2019-12-14 01:00",
             end: "2019-12-14 02:30",
             color: "green"
           },
           {
            name: "Session2",
            details: "Toronto, number of participants: 20",
            start: "2019-12-13 01:00",
            end: "2019-12-13 02:30",
            color: "green"
          },
          {
            name: "Session3",
            details: "Toronto, number of participants: 10",
            start: "2019-12-13 02:30",
            end: "2019-12-13 04:30",
            color: "blue"
          },
          {
            name: "Session4",
            details: "Toronto, number of participants: 15",
            start: "2019-12-11 01:00",
            end: "2019-12-11 02:30",
            color: "brown"
          }
         ]
       };