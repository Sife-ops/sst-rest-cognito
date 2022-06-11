import { API } from 'aws-amplify';
import { CategoryClass, CategoryIface } from '../../model/category';

type ApiResponse<D> = {
  success: boolean;
  data?: D;
  error?: unknown;
};

const requestFactory = function <V, D>(operation: string) {
  return (variables: V | undefined = undefined): Promise<ApiResponse<D>> => {
    return API.post('temp', '/private', {
      body: {
        operation,
        variables,
      },
    });
  };
};

// todo: types should match operations
export const categoryCreateRequest = requestFactory<
  CategoryIface,
  CategoryClass
>('categoryCreate');

export const categoryGetRequest = requestFactory<{ sk: string }, CategoryClass>(
  'categoryGet'
);

export const categoryListRequest = requestFactory<undefined, CategoryClass[]>(
  'categoryList'
);

export const categoryUpdateRequest = requestFactory<
  Partial<CategoryClass> & Pick<CategoryClass, 'sk'>,
  CategoryClass
>('categoryUpdate');

export const categoryDeleteRequest = requestFactory<{ sk: string }, unknown>(
  'categoryDelete'
);
