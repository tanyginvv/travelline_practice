type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Route = {
  method: HttpMethod;
  url: string;
  parameters?: { [key: string]: string };
  body?: { [key: string]: string | number };
}

export const routes: Route[] = [
  {
    method: 'GET',
    url: '/Users',
  },
  {
    method: 'POST',
    url: '/Users',
    body: {
      firstName: 'string',
      lastName: 'string',
      email: 'user@example.com',
      role: 1,
    },
  },
  {
    method: 'GET',
    url: '/Users/{id}',
    parameters: { id: 'int' },
  },
  {
    method: 'PUT',
    url: '/Users/{id}',
    parameters: { id: 'int' },
    body: {
      firstName: 'string',
      lastName: 'string',
      role: 1,
    },
  },
  {
    method: 'DELETE',
    url: '/Users/{id}',
    parameters: { id: 'int' },
  },
  {
    method: 'GET',
    url: '/Users/get-by-email/{email}',
    parameters: { email: 'string' },
  }
];