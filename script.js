let lastCount = 0;

async function loadMessages() {
  const response = await fetch("messages.json?t=" + Date.now());
  const data = await response.json();

  const wall = document.getElementById("wall");
  wall.innerHTML = "";

  data.forEach(entry => {
    const div = document.createElement("div");
    div.className = "message " + (Math.random() > 0.5 ? "chalk" : "paint");

    const rotation = Math.floor(Math.random() * 8 - 4);
    div.style.transform = `rotate(${rotation}deg)`;

    div.innerHTML = `<strong>${entry.handle}</strong><br/>${entry.message}`;
    wall.appendChild(div);
  });

  if (data.length > lastCount) {
    triggerShootingStar();
  }

  lastCount = data.length;
}

function triggerShootingStar() {
  const star = document.getElementById("shooting-star");
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";

  star.classList.remove("shoot");
  void star.offsetWidth;
  star.classList.add("shoot");
}

setInterval(loadMessages, 4000);
loadMessages();
