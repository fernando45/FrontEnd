import * as Types from '../../../../.src/app/generated/types';

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type LoginQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'ResultToken' }
    & Pick<Types.ResultToken, 'status' | 'message' | 'token'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id' | 'nombre' | 'apellidos' | 'email' | 'img' | 'role'>
    )> }
  ) }
);

export type RenuevaTokenQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type RenuevaTokenQuery = (
  { __typename?: 'Query' }
  & { renuevaToken: (
    { __typename?: 'ResultToken' }
    & Pick<Types.ResultToken, 'status' | 'message' | 'token'>
  ) }
);

export type AddUserMutationVariables = Types.Exact<{
  user: Types.UserInput;
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'ResultUser' }
    & Pick<Types.ResultUser, 'status' | 'message'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'nombre' | 'apellidos' | 'email' | 'password' | 'google' | 'role'>
    )> }
  ) }
);

export type EliminarUsuarioMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type EliminarUsuarioMutation = (
  { __typename?: 'Mutation' }
  & { eliminarUsuario?: Types.Maybe<(
    { __typename?: 'ResultUser' }
    & Pick<Types.ResultUser, 'status' | 'message'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id' | 'nombre' | 'email'>
    )> }
  )> }
);

export type UserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { userPorId: (
    { __typename?: 'ResultUser' }
    & Pick<Types.ResultUser, 'status' | 'message'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id' | 'nombre' | 'apellidos' | 'email' | 'role' | 'img' | 'password' | 'estado' | 'google'>
    )> }
  ) }
);

export type AllUsersQueryVariables = Types.Exact<{
  skip?: Types.Maybe<Types.Scalars['Int']>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
  orden?: Types.Maybe<Types.Scalars['String']>;
  filter?: Types.Maybe<Types.Scalars['String']>;
}>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'totalCount'>
  & { users: (
    { __typename?: 'QueryUser' }
    & Pick<Types.QueryUser, 'status' | 'message'>
    & { user: Array<Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id' | 'nombre' | 'email' | 'role' | 'img'>
    )>> }
  ) }
);

export type UserPorEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type UserPorEmailQuery = (
  { __typename?: 'Query' }
  & { userPorEmail: (
    { __typename?: 'ResultUser' }
    & Pick<Types.ResultUser, 'status' | 'message'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id' | 'nombre' | 'apellidos' | 'email' | 'role' | 'img'>
    )> }
  ) }
);

export type ActualizaUsuarioMutationVariables = Types.Exact<{
  user: Types.UserInput;
}>;


export type ActualizaUsuarioMutation = (
  { __typename?: 'Mutation' }
  & { actualizarUsuario: (
    { __typename?: 'ResultUser' }
    & Pick<Types.ResultUser, 'status' | 'message'>
    & { user?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id' | 'nombre' | 'apellidos' | 'email' | 'google' | 'password' | 'estado'>
    )> }
  ) }
);

export const LoginDocument = gql`
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

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
    document = LoginDocument;
    
  }
export const RenuevaTokenDocument = gql`
    query renuevaToken($email: String!) {
  renuevaToken(email: $email) {
    status
    message
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RenuevaTokenGQL extends Apollo.Query<RenuevaTokenQuery, RenuevaTokenQueryVariables> {
    document = RenuevaTokenDocument;
    
  }
export const AddUserDocument = gql`
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

  @Injectable({
    providedIn: 'root'
  })
  export class AddUserGQL extends Apollo.Mutation<AddUserMutation, AddUserMutationVariables> {
    document = AddUserDocument;
    
  }
export const EliminarUsuarioDocument = gql`
    mutation eliminarUsuario($id: String!) {
  eliminarUsuario(id: $id) {
    status
    message
    user {
      _id
      nombre
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EliminarUsuarioGQL extends Apollo.Mutation<EliminarUsuarioMutation, EliminarUsuarioMutationVariables> {
    document = EliminarUsuarioDocument;
    
  }
export const UserDocument = gql`
    query user($id: String!) {
  userPorId(id: $id) {
    status
    message
    user {
      _id
      nombre
      apellidos
      email
      role
      img
      password
      estado
      google
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
  }
export const AllUsersDocument = gql`
    query allUsers($skip: Int, $limit: Int, $orden: String, $filter: String) {
  users(skip: $skip, limit: $limit, orden: $orden, filter: $filter) {
    status
    message
    user {
      _id
      nombre
      email
      role
      img
    }
  }
  totalCount
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllUsersGQL extends Apollo.Query<AllUsersQuery, AllUsersQueryVariables> {
    document = AllUsersDocument;
    
  }
export const UserPorEmailDocument = gql`
    query userPorEmail($email: String!) {
  userPorEmail(email: $email) {
    status
    message
    user {
      _id
      nombre
      apellidos
      email
      role
      img
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserPorEmailGQL extends Apollo.Query<UserPorEmailQuery, UserPorEmailQueryVariables> {
    document = UserPorEmailDocument;
    
  }
export const ActualizaUsuarioDocument = gql`
    mutation actualizaUsuario($user: UserInput!) {
  actualizarUsuario(user: $user) {
    status
    message
    user {
      _id
      nombre
      apellidos
      email
      google
      password
      estado
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ActualizaUsuarioGQL extends Apollo.Mutation<ActualizaUsuarioMutation, ActualizaUsuarioMutationVariables> {
    document = ActualizaUsuarioDocument;
    
  }