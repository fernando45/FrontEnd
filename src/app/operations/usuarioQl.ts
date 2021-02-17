import gql from 'graphql-tag';

export const meData = gql`
query {
  me {
    status
    message
    user {
      _id
      nombre
      apellidos
      email
      registerDate
    }
  }
}
`;

export const login = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    message
    token
    user {
      _id
      nombre
      apellidos
      email
      img
      role
    }
  }
}
`;

export const reToken = gql`
query renuevaToken($email: String!){
  renuevaToken(email: $email){
    status
    message
    token
  }
}
`;

export const getUsers = gql`
query {
  users {
    _id
    nombre
    apellidos
    email
    registerDate
  }
}
`;


// Mutations

export const registerData = gql`
    mutation addUser($user: UserInput!) {
        register(user: $user) {
            status
            message
            user {
                nombre
                apellidos
                email
                password
                google
                role
            }
        }
    }
`;
