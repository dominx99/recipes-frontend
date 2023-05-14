export interface ExcludedPath {
  path: string;
  method: string;
}

const list: ExcludedPath[] = [
  {
    path: '/api/v1/favorite-recipes',
    method: 'get',
  }
];

export default list;
