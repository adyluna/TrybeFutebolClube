export const validUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export const validLogin = {
email: 'admin@admin.com',
password: 'secret_admin', 
};

export const loginWithoutEmail = {
  password: 'secret_admin', 
};

export const loginWithoutPassword = {
  email: 'admin@admin.com',
};

export const incorrectLoginEmail = {
  email: 'wrong@wrong.com',
  password: 'secret_admin',
}

export const incorrectLoginPassword = {
  email: 'admin@admin.com',
  password: 'wrong_password',
}

export const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njk3Mzk4NTZ9.tO3ulyg9L7lsPjd9Vykyqu3yD99KByegtHSG_G2Q5js";

export const teamsMock = [
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
  }
];

export const validTeam = {
  id: 1,
  teamName: "Avaí/Kindermann"
};

export const matchesMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeam": 4,
    "homeTeamGoals": 3,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "teamHome": {
      "teamName": "Corinthians"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  }
];

export const inProgressMatches = [
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  },
  {
    "id": 43,
    "homeTeam": 11,
    "homeTeamGoals": 0,
    "awayTeam": 10,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Napoli-SC"
    },
    "teamAway": {
      "teamName": "Minas Brasília"
    }
  },
]
