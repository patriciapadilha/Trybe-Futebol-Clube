export default {
  login: {
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  loginErr: {
    email: 'admin@admin.com',
    password: 'secret',
  },
  token: {
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjEyOTI2NTMsImV4cCI6MTY2MTM3OTA1M30.G_bSJ53i1WZUxtWaqu433ddzDHQQ0NQ86lUUJleBzms`,
  },
  user: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  },
  teams:  [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
    {
      id: 4,
      teamName: "Corinthians"
    },
    {
      id: 5,
      teamName: "Cruzeiro"
    },
    {
      id: 6,
      teamName: "Ferroviária"
    },
    {
      id: 7,
      teamName: "Flamengo"
    },
    {
      id: 8,
      teamName: "Grêmio"
    },
    {
      id: 9,
      teamName: "Internacional"
    },
    {
      id: 10,
      teamName: "Minas Brasília"
    },
    {
      id: 11,
      teamName: "Napoli-SC"
    },
    {
      id: 12,
      teamName: "Palmeiras"
    },
    {
      id: 13,
      teamName: "Real Brasília"
    },
    {
      id: 14,
      teamName: "Santos"
    },
    {
      id: 15,
      teamName: "São José-SP"
    },
    {
      id: 16,
      teamName: "São Paulo"
    }
  ],
  team: {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  matches: [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
          teamName: "São Paulo"
        },
        teamAway: {
          teamName: "Grêmio"
        }
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: false,
        teamHome: {
          teamName: "Internacional"
        },
        teamAway: {
          teamName: "Santos"
        }
    },
    {
      id: 3,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Corinthians"
        },
        teamAway: {
          teamName: "Napoli-SC"
        }
    }
  ],
  bodyCreateNewMatch: {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2
  },
  bodyCreateNewMatchErrorEqual: {
    homeTeam: 16,
    awayTeam: 16,
    homeTeamGoals: 2,
    awayTeamGoals: 2
  },
  bodyCreateNewMatchErrorNotExist: {
    homeTeam: 16,
    awayTeam: 200,
    homeTeamGoals: 2,
    awayTeamGoals: 2
  },
  resCreateNewMatch: {
    id: 49,
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  },
  bodyUpdateMatch: {
    homeTeamGoals: 3,
    awayTeamGoals: 1
  }
}