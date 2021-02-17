export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cliente = {
  __typename?: 'Cliente';
  _id?: Maybe<Scalars['String']>;
  documentos?: Maybe<Documentos>;
  documento?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  contacto?: Maybe<Array<Maybe<ContactoCliente>>>;
  registerDate?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['String']>;
  estado?: Maybe<Scalars['Boolean']>;
};

export type ClienteInput = {
  _id?: Maybe<Scalars['String']>;
  documentos?: Maybe<Documentos>;
  documento?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  contacto?: Maybe<Array<Maybe<ContactoClienteInput>>>;
  estado?: Maybe<Scalars['Boolean']>;
};

export type ContactoCliente = {
  __typename?: 'ContactoCliente';
  _id?: Maybe<Scalars['String']>;
  tipo?: Maybe<TipoContacto>;
  valor?: Maybe<Scalars['String']>;
  admin?: Maybe<Scalars['Boolean']>;
  Direccion?: Maybe<Scalars['Boolean']>;
  comercial?: Maybe<Scalars['Boolean']>;
};

export type ContactoClienteInput = {
  _id?: Maybe<Scalars['String']>;
  tipo?: Maybe<TipoContacto>;
  valor?: Maybe<Scalars['String']>;
  admin?: Maybe<Scalars['Boolean']>;
  Direccion?: Maybe<Scalars['Boolean']>;
  comercial?: Maybe<Scalars['Boolean']>;
};

export enum Documentos {
  Dni = 'DNI',
  Cif = 'CIF',
  Nif = 'NIF',
  Nie = 'NIE',
  Pasaporte = 'PASAPORTE',
  Otro = 'OTRO',
  No = 'NO',
  Censado = 'CENSADO'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Registro de los clientes en el sistema */
  registroCliente: ResultCliente;
  /** Registro de los usuarios en el sistema */
  register: ResultUser;
  actualizarUsuario: ResultUser;
  eliminarUsuario?: Maybe<ResultUser>;
  actualizaImagen?: Maybe<ResultUser>;
};


export type MutationRegistroClienteArgs = {
  cliente?: Maybe<ClienteInput>;
};


export type MutationRegisterArgs = {
  user?: Maybe<UserInput>;
};


export type MutationActualizarUsuarioArgs = {
  user?: Maybe<UserInput>;
};


export type MutationEliminarUsuarioArgs = {
  id: Scalars['String'];
};


export type MutationActualizaImagenArgs = {
  user: UserImg;
};

export type Query = {
  __typename?: 'Query';
  clientes: QueryCliente;
  /** Obtenemos las lista de todos los usuarios */
  users: QueryUser;
  /** Iniciamos sesión en el sistema */
  login: ResultToken;
  /** Obtener nuestra información con el token */
  renuevaToken: ResultToken;
  me: ResultUser;
  userPorId: ResultUser;
  userPorEmail: ResultUser;
  /** Total recuento */
  totalCount?: Maybe<Scalars['String']>;
};


export type QueryClientesArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  orden?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  orden?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryRenuevaTokenArgs = {
  email: Scalars['String'];
};


export type QueryUserPorIdArgs = {
  id: Scalars['String'];
};


export type QueryUserPorEmailArgs = {
  email: Scalars['String'];
};

export type QueryCliente = {
  __typename?: 'QueryCliente';
  status?: Maybe<Scalars['Boolean']>;
  message: Scalars['String'];
  cliente: Array<Maybe<Cliente>>;
};

export type QueryUser = {
  __typename?: 'QueryUser';
  status?: Maybe<Scalars['Boolean']>;
  message: Scalars['String'];
  user: Array<Maybe<User>>;
};

export type ResultCliente = {
  __typename?: 'ResultCliente';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  cliente?: Maybe<Cliente>;
};

export type ResultImg = {
  __typename?: 'ResultImg';
  status: Scalars['Boolean'];
};

export type ResultToken = {
  __typename?: 'ResultToken';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ResultUser = {
  __typename?: 'ResultUser';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export enum Roles {
  Admin = 'ADMIN',
  Cliente = 'CLIENTE',
  Supervisor = 'SUPERVISOR',
  Operario = 'OPERARIO',
  Usuario = 'USUARIO'
}

export enum TipoContacto {
  Telefono = 'telefono',
  Web = 'web',
  Email = 'Email',
  Movil = 'movil'
}

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  apellidos?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  registerDate?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['String']>;
  estado?: Maybe<Scalars['Boolean']>;
  google?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Roles>;
};

export type UserImg = {
  _id?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
};

export type UserInput = {
  _id?: Maybe<Scalars['String']>;
  nombre: Scalars['String'];
  apellidos?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  google?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Roles>;
};
