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

export const wrongLoginEmail = {
  email: 'wrong@wrong.com',
  password: 'secret_admin',
}

export const wrongLoginPassword = {
  email: 'admin@admin.com',
  password: 'wrong_password',
}
