import React from 'react';
import { API, Auth } from 'aws-amplify';

export const Dev: React.FC = () => {
  const [name, setName] = React.useState('');
  const [sk, setSk] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [favorite, setFavorite] = React.useState(false);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
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
          placeholder="favorite"
          onChange={(e) => setFavorite((s) => !s)}
          checked={favorite}
        />
        <br />
        <button type="submit">submit</button>
      </form>

      <h1>create category</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post('temp', '/private', {
            body: {
              operation: 'categoryCreate',
              variables: {
                name,
                description,
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
        <button type="submit">submit</button>
      </form>

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
