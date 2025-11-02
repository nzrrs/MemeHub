import laughingEmoji from "../assets/images/laughingEmoji.png";

export default function Header() {
  return (
    <header className="header">
      <img src={laughingEmoji} />
      <h1>Meme Generator</h1>
    </header>
  );
}
