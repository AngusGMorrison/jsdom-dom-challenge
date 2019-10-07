const heading = document.getElementById("counter");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const pauseButton = document.getElementById("pause");
const likeButton = document.getElementById("heart");
const submitButton = document.getElementById("submit");
submitButton.type = "button";

let counter = parseInt(heading.textContent);
let intervalID = setInterval(incrementHeading, 1000);
let isPaused = false;
let numberLikes = {}

submitButton.type = "button";

function incrementHeading() {
    counter++;
    setHeadingTextContent();
}

function decrementHeading() {
    counter--;
    setHeadingTextContent();
}

function setHeadingTextContent() {
  heading.textContent = `${counter}`;
}

minusButton.addEventListener("click", function(e) {
  if (counter > 0) {
    decrementHeading();
  }
});

plusButton.addEventListener("click", function(e) {
  incrementHeading();
});

pauseButton.addEventListener("click", function(e) {
  isPaused ? startTimer() : pauseTimer()
});

function startTimer() {
  intervalID = setInterval(incrementHeading, 1000);
  toggleButtons();
  isPaused = false;
}

function pauseTimer() {
  clearInterval(intervalID);
  toggleButtons();
  isPaused = true;
}

function toggleButtons() {
  let buttons = document.getElementsByTagName("button");
  Array.prototype.forEach.call(buttons, button => {
    if (button.id !== "pause") {
      button.disabled = !button.disabled;
    }
  });
}

likeButton.addEventListener("click", function(e) {
  updateLikeList();
});

function updateLikeList() {
  ul = document.getElementsByClassName("likes")[0];
  incrementLikeCounter();
  updateList();
}

function incrementLikeCounter() {
  numberLikes[counter] ? numberLikes[counter]++ : numberLikes[counter] = 1;
}

function updateList() {
  let li_content = generateLiContent();
  let li = document.getElementById(counter);
 
  if (li) {
    li.textContent = li_content;
  } else {
    createListItem(li_content);
  }
}

function generateLiContent() {
  let times_liked = pluralize(numberLikes[counter], "time");
  return `${counter} has been liked ${times_liked}`;
}

function pluralize(quantity, word) {
  if (quantity === 1) {
    return `${quantity} ${word}`
  } else {
    return `${quantity} ${word}` + "s"
  }
}

function createListItem(li_content) {
  li = document.createElement("li");
  li.id = counter;
  li.textContent = li_content;
  ul.appendChild(li);
}

submitButton.addEventListener("click", function(e) {
  submitComment();
});

function submitComment() {
  let commentContent = document.getElementById("comment-input").value;
  if (commentContent) {
    postComment(commentContent);
  }
}

function postComment(commentContent) {
  let newComment = createComment(commentContent);
  displayComment(newComment);
  clearCommentField();
}

function createComment(commentContent) {
  let newComment = document.createElement("p")
  newComment.textContent = commentContent;
  return newComment;
}

function displayComment(comment) {
  let commentList = document.getElementById("list");
  commentList.appendChild(comment);
}

function clearCommentField() {
  document.getElementById("comment-input").value = "";
}