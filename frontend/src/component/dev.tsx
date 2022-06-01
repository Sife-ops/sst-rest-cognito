import React from "react";
import { API, Auth } from "aws-amplify";

export const Dev: React.FC = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [favorite, setFavorite] = React.useState(false);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      <h1>create bookmark</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await API.post("temp", "/private", {
            body: {
              operation: "bookmark-create",
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
          const res = await API.post("temp", "/private", {
            body: {
              operation: "category-create",
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

      <h1>get</h1>
      <button
        onClick={async () => {
          const res = await API.get("temp", "/public", {});
          console.log(res);
        }}
      >
        public
      </button>
      <br />

      <h1>list</h1>
      <button
        onClick={async () => {
          const res = await API.post("temp", "/private", {
            body: {
              operation: "item-list",
            },
          });
          console.log(res);
        }}
      >
        list
      </button>
    </div>
  );
};
