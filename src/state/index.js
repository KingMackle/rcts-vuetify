export const State = {
    currentUser: {
        name: "test",
        email: "test",
        password: "test",
        id: "test",
        location: "Ontario, Canada",
        experienceLevel: "Senior",
        type: "trainer"
      },
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
        name: "Jane Doe",
        email: "jane@gmail.com",
        password: "1234",
        id: "efgh",
        location: "Ontario, Canada",
        educationBackground: "Software Engineer",
        type: "trainee"
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
            name:"badPerformance",
            cd: [4.5, 4, 4.4, 4.6, 4.2, 4],
            cpm: [95, 99, 96, 89, 90, 92],
            recoil: [4.2, 3.7, 4.0, 4.3, 3.9, 3.7],
            location: "4,-3"
        },
        {
            name:"justBadCd",
            cd: [4.5, 4, 4.4, 4.6, 4.2, 4],
            cpm: [100, 102, 103, 115, 101, 107],
            recoil: [4.4, 4, 4.3, 4.5, 4, 3.9],
            location: "1,1"
        },
        {
            name:"justBadCpm",
            cd: [5, 4.8, 5, 4.7, 4.8, 5],
            cpm: [95, 99, 96, 89, 90, 92],
            recoil: [5, 4.8, 4.9, 4.6, 4.8, 4.9],
            location: "1,1"
        },
        {
            name:"justBadRecoil",
            cd: [5, 4.8, 5, 4.7, 4.8, 5],
            cpm: [100, 102, 103, 115, 101, 107],
            recoil: [4.4, 4, 4.3, 4.5, 4, 3.9],
            location: "1,1"
        }
    ]
  };