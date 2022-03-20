import React from "react";
import axios from "axios";

async function sendMessage(e) {
  e.preventDefault();
  const webhook = document.getElementById("webhook").value;
  const username = document.getElementById("username").value;
  const avatar_url = document.getElementById("avatar_url").value;
  const content = document.getElementById("content").value;

  const author = {
    name: document.getElementById("author_name").value,
    url: document.getElementById("author_url").value,
    icon_url: document.getElementById("author_icon_url").value,
  };
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;
  const color = parseInt(document.getElementById("color").value);
  const description = document.getElementById("description").value;
  const thumbnail = {
    url: document.getElementById("thumbnail").value,
  };
  const image = {
    url: document.getElementById("image").value,
  };
  const footer = {
    text: document.getElementById("footer_text").value,
    icon_url: document.getElementById("footer_icon_url").value,
  };
  const body = {
    webhook,
    username,
    avatar_url,
    content,
    embeds: author.name
      ? [
          {
            author,
            title,
            url,
            color,
            description,
            thumbnail,
            image,
            footer,
          },
        ]
      : null,
  };
  const res = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
    url: "https://lucetre.herokuapp.com/api/discord",
  });
  console.log(res);
}

const DiscordFeature = () => {
  return (
    <>
      <h1>Discord Webhook Message</h1>
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="webhook" className="form-label">
            <b>webhook</b>
          </label>
          <input
            type="webhook"
            className="form-control"
            id="webhook"
            defaultValue="https://discord.com/api/webhooks/954545152880435221/nCMOf26UD8ZH6l-XF6TTNyuLpL49yCXS_xfK5sbL1iI4WJ0UX31M7-9SOrB2QPPUJqRF"
          />
        </div>
        <div className="col-6">
          <label htmlFor="username" className="form-label">
            <b>username</b>
          </label>
          <input
            type="username"
            className="form-control"
            id="username"
            defaultValue="lucetre"
          />
        </div>
        <div className="col-6">
          <label htmlFor="avatar_url" className="form-label">
            <b>avatar_url</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="avatar_url"
            placeholder="https://i.imgur.com/4M34hi2.png"
          />
        </div>
        <div className="col-12">
          <label htmlFor="content" className="form-label">
            <b>content</b>
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="2"
            defaultValue="@everyone Text message. Up to 2000 characters."
          />
        </div>
        <div className="col-12">
          <b>embed</b>
        </div>
        <div className="col-4">
          <label htmlFor="author_name" className="form-label">
            author_name
          </label>
          <input
            type="author_name"
            className="form-control"
            id="author_name"
            placeholder="Birdie♫"
          />
        </div>
        <div className="col-4">
          <label htmlFor="author_url" className="form-label">
            author_url
          </label>
          <input
            type="text"
            className="form-control"
            id="author_url"
            placeholder="https://www.reddit.com/r/cats/"
          />
        </div>
        <div className="col-4">
          <label htmlFor="author_icon_url" className="form-label">
            author_icon_url
          </label>
          <input
            type="text"
            className="form-control"
            id="author_icon_url"
            placeholder="https://i.imgur.com/R66g1Pe.jpg"
          />
        </div>
        <div className="col-4">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="New Title"
          />
        </div>
        <div className="col-4">
          <label htmlFor="url" className="form-label">
            url
          </label>
          <input
            type="text"
            className="form-control"
            id="url"
            placeholder="https://google.com/"
          />
        </div>
        <div className="col-4">
          <label htmlFor="color" className="form-label">
            color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            placeholder="15258703"
          />
        </div>
        <div className="col-12">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`"
          />
        </div>
        <div className="col-6">
          <label htmlFor="thumbnail" className="form-label">
            thumbnail
          </label>
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            placeholder="https://avatars.githubusercontent.com/u/26702243?v=4"
          />
        </div>
        <div className="col-6">
          <label htmlFor="image" className="form-label">
            image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="https://avatars.githubusercontent.com/u/26702243?v=4"
          />
        </div>
        <div className="col-6">
          <label htmlFor="footer_text" className="form-label">
            footer_text
          </label>
          <input
            type="text"
            className="form-control"
            id="footer_text"
            placeholder="Woah! So cool! :smirk:"
          />
        </div>
        <div className="col-6">
          <label htmlFor="footer_icon_url" className="form-label">
            footer_icon_url
          </label>
          <input
            type="text"
            className="form-control"
            id="footer_icon_url"
            placeholder="https://i.imgur.com/fKL31aD.jpg"
          />
        </div>

        {/* 
    "fields": [{
        "name": "Text",
        "value": "More text",
        "inline": true
      },{
        "name": "Even more text",
        "value": "Yup",
        "inline": true
      },{
        "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
        "value": "okay..."
      },{
        "name": "Thanks!",
        "value": "You're welcome :wink:"
      }
    ], */}

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={sendMessage}
          >
            Message
          </button>
        </div>
      </form>
    </>
  );
};

export default DiscordFeature;
