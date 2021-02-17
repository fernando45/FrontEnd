import * as Types from '../../../../.src/app/generated/types';

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListaClientesQueryVariables = Types.Exact<{
  skip?: Types.Maybe<Types.Scalars['Int']>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
  orden?: Types.Maybe<Types.Scalars['String']>;
  filter?: Types.Maybe<Types.Scalars['String']>;
}>;


export type ListaClientesQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'totalCount'>
  & { clientes: (
    { __typename?: 'QueryCliente' }
    & Pick<Types.QueryCliente, 'status' | 'message'>
    & { cliente: Array<Types.Maybe<(
      { __typename?: 'Cliente' }
      & Pick<Types.Cliente, '_id' | 'documentos' | 'documento'>
      & { contacto?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'ContactoCliente' }
        & Pick<Types.ContactoCliente, '_id' | 'valor'>
      )>>> }
    )>> }
  ) }
);

export type NuevoClienteMutationVariables = Types.Exact<{
  cliente: Types.ClienteInput;
}>;


export type NuevoClienteMutation = (
  { __typename?: 'Mutation' }
  & { registroCliente: (
    { __typename?: 'ResultCliente' }
    & Pick<Types.ResultCliente, 'status' | 'message'>
    & { cliente?: Types.Maybe<(
      { __typename?: 'Cliente' }
      & Pick<Types.Cliente, '_id' | 'registerDate'>
      & { contacto?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'ContactoCliente' }
        & Pick<Types.ContactoCliente, '_id' | 'valor'>
      )>>> }
    )> }
  ) }
);

export const ListaClientesDocument = gql`
    query listaClientes($skip: Int, $limit: Int, $orden: String, $filter: String) {
  clientes(skip: $skip, limit: $limit, orden: $orden, filter: $filter) {
    status
    message
    cliente {
      _id
      documentos
      documento
      contacto {
        _id
        valor
      }
    }
  }
  totalCount
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListaClientesGQL extends Apollo.Query<ListaClientesQuery, ListaClientesQueryVariables> {
    document = ListaClientesDocument;
    
  }
export const NuevoClienteDocument = gql`
    mutation nuevoCliente($cliente: ClienteInput!) {
  registroCliente(cliente: $cliente) {
    status
    message
    cliente {
      _id
      contacto {
        _id
        valor
      }
      registerDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NuevoClienteGQL extends Apollo.Mutation<NuevoClienteMutation, NuevoClienteMutationVariables> {
    document = NuevoClienteDocument;
    
  }