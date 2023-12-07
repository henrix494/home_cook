import "./particle.css";
export default function BackGorundLogin() {
  const circles = [];

  for (let index = 1; index <= 100; index++) {
    circles.push(
      <div key={index} className="circle-container">
        <div className="circle"></div>
      </div>
    );
  }

  return <div className=" scroll-bar">{circles}</div>;
}
