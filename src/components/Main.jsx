/**
 * Main component: a simple meme generator UI.
 *
 * Manages two pieces of state:
 * - meme: { topText: string, bottomText: string, imageUrl: string }
 *   - topText: text displayed at the top of the meme
 *   - bottomText: text displayed at the bottom of the meme
 *   - imageUrl: URL of the currently displayed meme image
 * - allMemes: Array of meme templates fetched from the Imgflip API
 *   (each item typically includes { id, name, url, width, height, box_count })
 *
 * Behavior:
 * - On mount, performs an async fetch to "https://api.imgflip.com/get_memes"
 *   and stores the resulting templates in allMemes. Network errors are caught
 *   and logged to the console.
 * - inputHandler(event): updates the corresponding field (topText or bottomText)
 *   of the meme state from the controlled input's name and value.
 *   @param {React.ChangeEvent<HTMLInputElement>} event - change event from the input
 * - clickHandler(): if allMemes is non-empty, picks a random template and sets
 *   meme.imageUrl to the selected template's url.
 *
 * Rendering:
 * - A form with two controlled text inputs (topText, bottomText) and a button
 *   to get a new random meme image.
 * - A display area showing the current meme image and overlaying the top and
 *   bottom texts.
 *
 * @component
 * @returns {JSX.Element} The meme generator main content.
 */

import { useState, useEffect } from "react";
export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMeme() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        if (!res.ok) {
          throw new Error("Error while fetching memes");
        }
        const data = await res.json();
        setAllMemes(data.data.memes);
      } catch (err) {
        console.error(err);
      }
    }
    getMeme();
  }, []);

  function inputHandler(e) {
    const { name, value } = e.currentTarget;
    setMeme((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function clickHandler() {
    if (!allMemes.length) return;

    const randomInt = Math.floor(Math.random() * allMemes.length);
    const imgUrl = allMemes[randomInt].url;
    setMeme((prevMemes) => ({
      ...prevMemes,
      imageUrl: imgUrl,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            onChange={inputHandler}
            type="text"
            placeholder="One does not simply"
            name="topText"
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            value={meme.bottomText}
          />
        </label>
        <button onClick={clickHandler}>Get a new meme image ⚡</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
