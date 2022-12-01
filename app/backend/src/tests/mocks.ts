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
