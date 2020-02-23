// Grab DOM Elementsß
const websiteName = document.getElementById("websiteName");
const websiteURL = document.getElementById("websiteURL");
const myform = document
  .getElementById("main-form")
  .addEventListener("submit", addBookmark);

// Add bookmark to browser local storage and display in UI
function addBookmark(e) {
  e.preventDefault();
  var bookmark = {
    name: websiteName.value,
    url: websiteURL.value
  };

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    //add bookmark to array
    bookmarks.push(bookmark);
    //update local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  if (localStorage.getItem("bookmarks") != null) {
    // get local storage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //add bookmark to array
    bookmarks.push(bookmark);
    //update local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  fetchBookmarks();
}

// Delete bookmark from broweser local storage and update UI
function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  bookmarks.forEach(bookmark => {
    if (bookmark.url == url) {
      bookmarks.splice(bookmarks.indexOf(bookmark), 1);
    }
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  websiteName.value = "";
  websiteURL.value = "";
}

// Grab bookmarks from browser local storage and display in UI
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  const bookmarkResultDiv = document.getElementById("bookmark-results");

  bookmarkResultDiv.innerHTML = "";

  bookmarks.forEach(bookmark => {
    var name = bookmark.name;
    var url = bookmark.url;
    bookmarkResultDiv.innerHTML += `<div class="well" 
                                      <h3> ${name}
                                        <a class="btn btn-default" target="_blank" href="'${url}'"> Visit </a>
                                        <a class="btn btn-danger" href="#" onclick="deleteBookmark(\'${url}\')"> Delete </a>
                                      </h3>
                                    </div>`;
  });
}
