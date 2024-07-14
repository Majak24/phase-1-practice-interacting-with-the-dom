"use strict";

function getLikesElement(likeCount) {
  const existingLike = document.querySelector(`[data-num="${likeCount}"]`);
  if (existingLike) {
    const span = existingLike.querySelector("span");
    const currentLikes = parseInt(span.innerText, 10);
    span.innerText = currentLikes + 1;
    return existingLike;
  }

  const newLike = document.createElement("li");
  newLike.dataset.num = likeCount;
  newLike.innerHTML = `${likeCount} has been liked <span>1</span> time`;
  document.querySelector(".likes").appendChild(newLike);
  return newLike;
}

function startTimer() {
  return setInterval(() => {
    const counter = document.getElementById("counter");
    const currentCount = parseInt(counter.innerText, 10);
    counter.innerText = currentCount + 1;
  }, 1000);
}

let playing = true;
let interval = startTimer();

const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.getElementsByTagName("form")[0];

minusButton.addEventListener("click", () => {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText, 10);
  counter.innerText = currentCount - 1;
});

plusButton.addEventListener("click", () => {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText, 10);
  counter.innerText = currentCount + 1;
});

heartButton.addEventListener("click", () => {
  const counter = document.getElementById("counter");
  const likeCount = parseInt(counter.innerText, 10);
  const likesElement = getLikesElement(likeCount);
});

pauseButton.addEventListener("click", () => {
  playing = !playing;
  if (playing) {
    interval = startTimer();
    pauseButton.innerText = "pause";
  } else {
    clearInterval(interval);
    pauseButton.innerText = "resume";
  }
  const buttons = Array.from(document.getElementsByTagName("button"));
  buttons.forEach((button) => {
    if (button.id !== "pause") {
      button.disabled = !playing;
    }
  });
});

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentInput = event.target.children[0];
  const comment = commentInput.value;
  commentInput.value = "";
  const commentsElement = document.querySelector(".comments");
  const commentParagraph = document.createElement("p");
  commentParagraph.innerText = comment;
  commentsElement.appendChild(commentParagraph);
});
