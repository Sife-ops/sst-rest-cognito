import React from 'react';
import { API, Auth } from 'aws-amplify';
import { CategoryClass, CategoryIface } from '../../../model/category';

const queryFactory = function <V, D>(operation: string) {
  return (
    variables: V
  ): Promise<{
    success: boolean;
    data: D;
  }> => {
    return API.post('temp', '/private', {
      body: {
        operation,
        variables,
      },
    });
  };
};

const categoryCreateQuery = queryFactory<CategoryIface, CategoryClass>(
  'categoryCreate'
);

export const Dev: React.FC = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [description, setDescription] = React.useState('');
  const [favorite, setFavorite] = React.useState(false);
  const [name, setName] = React.useState('');
  const [sk, setSk] = React.useState('');
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      <h1>category create</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await categoryCreateQuery({
            name,
            description,
          });
          console.log(res);
        }}
      >
        <input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <input
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>category update</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'categoryUpdate',
              variables: {
                sk,
                name,
                description,
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="sk"
          onChange={(e) => setSk(e.target.value)}
          value={sk}
        />
        <br />
        <input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <input
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>bookmark update</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'bookmarkUpdate',
              variables: {
                sk,
                name,
                description,
                url,
                favorite,
                categories: categories.filter((category) => category.selected),
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="sk"
          onChange={(e) => setSk(e.target.value)}
          value={sk}
        />
        <br />
        <input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <input
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <input
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <br />
        <label>favorite</label>
        <input
          type="checkbox"
          onChange={() => setFavorite((s) => !s)}
          checked={favorite}
        />
        <br />
        <br />
        {categories.map((category) => (
          <div key={category.sk}>
            <label>{category.name}</label>
            <input
              type="checkbox"
              onChange={() => {
                setCategories((s) =>
                  s.map((c) => {
                    if (c.sk === category.sk) {
                      return {
                        ...c,
                        selected: !c.selected,
                      };
                    } else {
                      return c;
                    }
                  })
                );
              }}
              checked={category.selected}
            />
          </div>
        ))}
        <button type="submit">submit</button>
      </form>

      <h1>bookmark create</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'bookmarkCreate',
              variables: {
                name,
                description,
                url,
                favorite,
                categories: categories.filter((category) => category.selected),
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <input
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <input
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <br />
        <label>favorite</label>
        <input
          type="checkbox"
          onChange={() => setFavorite((s) => !s)}
          checked={favorite}
        />
        <br />
        <br />
        {categories.map((category) => (
          <div key={category.sk}>
            <label>{category.name}</label>
            <input
              type="checkbox"
              onChange={() => {
                setCategories((s) =>
                  s.map((c) => {
                    if (c.sk === category.sk) {
                      return {
                        ...c,
                        selected: !c.selected,
                      };
                    } else {
                      return c;
                    }
                  })
                );
              }}
              checked={category.selected}
            />
          </div>
        ))}
        <button type="submit">submit</button>
      </form>

      <h1>category delete</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'categoryDelete',
              variables: {
                sk,
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="sk"
          onChange={(e) => setSk(e.target.value)}
          value={sk}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>bookmark delete</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'bookmarkDelete',
              variables: {
                sk,
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="sk"
          onChange={(e) => setSk(e.target.value)}
          value={sk}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>category get</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'categoryGet',
              variables: {
                sk,
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="sk"
          onChange={(e) => setSk(e.target.value)}
          value={sk}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>category list</h1>
      <button
        onClick={async () => {
          const res = (await API.post('temp', '/private', {
            body: {
              operation: 'categoryList',
            },
          })) as {
            success: string;
            data: any[];
          };
          console.log(res);
          if (res.success) {
            setCategories(
              res.data.map((category) => ({
                ...category,
                selected: false,
              }))
            );
          }
        }}
      >
        submit
      </button>

      <h1>bookmark get</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'bookmarkGet',
              variables: {
                sk,
              },
            },
          });
          console.log(res);
        }}
      >
        <input
          placeholder="sk"
          onChange={(e) => setSk(e.target.value)}
          value={sk}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>bookmark list</h1>
      <button
        onClick={async () => {
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'bookmarkList',
            },
          });
          console.log(res);
        }}
      >
        submit
      </button>

      <h1>item list</h1>
      <button
        onClick={async () => {
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'itemList',
            },
          });
          console.log(res);
        }}
      >
        submit
      </button>

      <h1>public</h1>
      <button
        onClick={async () => {
          const res = await API.get('temp', '/public', {});
          console.log(res);
        }}
      >
        public
      </button>
      <br />
    </div>
  );
};
